import json, sys, urllib.request, urllib.parse, re
UA={"User-Agent":"FisicaSemMisterio/1.0 (janseysilva@gmail.com)"}
def q(params):
    params.update(format="json")
    u="https://commons.wikimedia.org/w/api.php?"+urllib.parse.urlencode(params)
    return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60))
for termo in sys.argv[1:]:
    r=q(dict(action="query",generator="search",gsrsearch=termo+" filetype:bitmap",gsrnamespace=6,gsrlimit=8,prop="imageinfo",iiprop="url|size|extmetadata",iiurlwidth=1920))
    print("==",termo)
    for p in sorted(r.get("query",{}).get("pages",{}).values(), key=lambda p:p.get("index",0)):
        ii=p["imageinfo"][0]; m=ii.get("extmetadata",{})
        lic=m.get("LicenseShortName",{}).get("value","?"); art=re.sub("<[^>]+>","",m.get("Artist",{}).get("value","?"))[:40]
        print(f'  {p["title"][5:80]} | {ii["width"]}x{ii["height"]} | {lic} | {art}')
