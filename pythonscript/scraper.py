import pyrebase
from bs4 import BeautifulSoup
import urllib2
import re
import time

config = {
  "apiKey": "AIzaSyDhSkeyPzWMIellc4UJHsL_gaCIlXKuc84",
  "authDomain": "absentee-3cd83.firebaseapp.com",
  "databaseURL": "https://absentee-3cd83.firebaseio.com",
  "storageBucket": "absentee-3cd83.appspot.com"
}
try:
    firebase = pyrebase.initialize_app(config)
    print "Initialized Successfully"
except:
    print "Failed Initialization"

db = firebase.database()



def readKey(i):
    root = "http://www3.nccde.org/parcel/Details/Default.aspx?ParcelKey=%s"
    theurl = root % (i)
    print "Trying key %s" % i
    res = urllib2.urlopen(theurl)
    html = res.read()
    soup = BeautifulSoup(html)
    try:
        owner = getOwnerName(soup)
        ownerAddr = getOwnerAddress(soup)
        propAddr = getPropertyAddress(soup)
        propZip = re.findall(' ([0-9]{5})', propAddr["city"])[0]
        ownerZip = re.findall(' ([0-9]{5})', ownerAddr["city"])[0]
    except:
        print "Dud parcel key %s" % i
        return
    try:
        propNum = re.findall('([0-9]{1,10})', propAddr["line1"])[0]
    except:
        try:
            propNum = re.findall('([0-9]{1,10})', propAddr["line2"])[0]
        except:
            print "Dud later %s" % i
            return
    try:
        ownerNum = re.findall('([0-9]{1,10})', ownerAddr["line1"])[0]
    except:
        try:
            ownerNum = re.findall('([0-9]{1,10})', ownerAddr["line2"])[0]
        except:
            print "Dud later2 %s" % i
            return
    parcel = getParcelNumber(soup)
    absentee = True
    if (propZip == ownerZip and propNum == ownerNum):
        absentee = False
    reportProp(absentee, propZip, parcel, propAddr, ownerAddr, owner)

def reportProp(absentee, propZip, parcel, propAddr, ownerAddr, owner):
    if absentee:
        rawref = db.child("%s" % propZip).child("%s" % parcel)
        oldval = rawref.get()
        if oldval.val()==None:
            newref = db.child("%s" % propZip).child("new").child("%s" % time.strftime("%Y%m%d"))
            thedata = {"owner": {"name": owner, "addr": ownerAddr}, "property": {"addr": propAddr}}
            newref.push(thedata)
            db.child("%s" % propZip).child("%s" % parcel).set(thedata)
        else:
            #or the owner changed... TODO
            print "WHOA!!!!!!!!!!!!!!!!!!!!!"
            print oldval, propAddr, owner, ownerAddr

def getParcelNumber(soup):
    parcelText = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__Header"}).text
    return re.findall('([0-9]{8,20})', parcelText)[0]

def getPropertyAddress(soup):
    cityzip = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelPropertyCityStateZip"})
    line1 = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelPropertyAddress"})
    return {"line1":line1.text, "city":cityzip.text}

def getOwnerAddress(soup):
    line1 = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelOwnerAddress1"}).text
    line2 = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelOwnerAddress2"}).text
    cityzip = soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelOwnerCityStateZipCountry"}).text
    return {"line1":line1, "line2":line2, "city":cityzip}

def getOwnerName(soup):
    return soup.findChild(attrs={"id":"ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder1__LabelOwner"}).text

def text2int(textnum, numwords={}):
    if not numwords:
      units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
      ]

      tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

      scales = ["hundred", "thousand", "million", "billion", "trillion"]

      numwords["and"] = (1, 0)
      for idx, word in enumerate(units):    numwords[word] = (1, idx)
      for idx, word in enumerate(tens):     numwords[word] = (1, idx * 10)
      for idx, word in enumerate(scales):   numwords[word] = (10 ** (idx * 3 or 2), 0)

    current = result = 0
    for word in textnum.split():
        if word not in numwords:
          raise Exception("Illegal word: " + word)

        scale, increment = numwords[word]
        current = current * scale + increment
        if scale > 100:
            result += current
            current = 0

    return result + current
