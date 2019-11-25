import os
import re
import requests
import json

def get_results(race,year,gender):
    gender = gender[0]
    race = race[0]
    url = "http://eodg.atm.ox.ac.uk/user/dudhia/rowing/bumps/%s%s/%s%s%s.txt" % (race,year,race,year,gender)
    try:
        r = requests.get(url)
        return r.content.split('\n')
    except:
        #print ("No data at URL",url)
        return None

def map_college(name):
    name = name.replace(" ","")
    repl = reversed(["I", "II","III", "IV","V","X"])
    for r in repl:
        name = name.replace(r,"")
    d = {
        "Pembroke": "PMB",
        "ChristChurch": "CHB",
        "Oriel": "ORO",
        "University": "UCO",
        "Wolfson": "WOO",
        "Magdalen": "MAG",
        "StCatherine's": "SCO",
        "Trinity": "TRO",
        "Balliol": "BAL",
        "Worcester": "WRO",
        "Hertford": "HEC",
        "S.E.H.": "SEH",
        "Keble": "KEB",
        "Wadham": "WAD",
        "Lincoln": "LIC",
        "StJohn's": "SJO",
        "StAnne's": "SAC",
        "NewCollege": "NEC",
        "Brasenose": "BRC",
        "L.M.H.": "LMH",
        "Exeter": "EXC",
        "Mansfield": "MAN",
        "Jesus": "JEO",
        "Somerville": "SOM",
        "StPeter's": "SPC",
        "CorpusChristi": "COO",
        "Queen's": "QCO",
        "Merton": "MER",
        "StHugh's": "SHG",
        "Linacre": "LIN",
        "GreenTempleton": "GTM",
        "StHilda's": "SHI",
        "Regent'sPark": "RPC",
        "StBenet'sHall": "SBH",
        "StAntony's": "SAY",


        "Templeton": "TMP",
        "OslerHouse": "OSL",
        "Osler-Green": "OSLG",
        "Westminster": "WES",
        "Manchester": "MAC",
        "MagdalenHall": "MAH",
        "StMaryHall": "SMH",
        "NewnnHall": "NIH", # New Inn Hall
        "O.U.W.B.C.": "OUWBC",



    }
    if "&" in name:
        return "COMPOSITE"
    if name not in d:
        print ("Unknown club: %s" % name)
        return None
    return d[name]


def is_int(i):
    try:
        int(i)
        return True
    except ValueError:
        return False


def count_days(line):
    l = line.split()
    days = len([1 for i in l if is_int(i)])
    return days


def parse_line(url,line):
    line = line.decode('ISO-8859-1')
    line = line.replace("\n", "")
    l = line.split()
    if len(l) < 5:
        return None
    else:
        racingdays = count_days(line)
        if racingdays < 4:
            return None
        moves = l[-racingdays:]
        college = " ".join(l[:-racingdays])
        if map_college(college) is None:
            print(url, college, line)
    ret_moves = []
    for m in moves:
        ret_moves.append({"status:":"True",
                          "moves":m}
                         )
    return map_college(college), ret_moves


if __name__ == "__main__":
    if not os.path.exists("starting_order"):
        os.mkdir("starting_order")
    for race in ["eights","torpids"]:
        for year in range(1820,2019):
            d = {}
            for gender in ["men","women"]:
                res = get_results(race,year,gender)
                if res is None:
                    continue

                c = 0
                url = "http://eodg.atm.ox.ac.uk/user/dudhia/rowing/bumps/%s%s/%s%s%s.txt" % (race[0], year, race[0], year, gender[0])
                for line in res:
                    ret = parse_line(url,line)
                    if ret is None:
                        continue
                    c += 1
                    college,moves = ret
                    if not college in d:
                        d[college] = {}
                    if gender not in d[college]:
                        d[college][gender]=[]
                    d[college][gender].append({})
                    d[college][gender][-1]["moves"]=[]
                    d[college][gender][-1]["moves"].append(moves)
                    d[college][gender][-1]["start"]=c
            with open('starting_order/%s_%s.json' % (race,year), 'w') as outfile:
                json.dump(d, outfile,indent=4)
