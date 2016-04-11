from django.shortcuts import render
from models import Resource
from django.http import HttpResponse
from math import sin, cos, sqrt, atan2, radians


def loadResourceRequest(request):
    resources = Resource.objects.all()
    result = ""
    for reso in resources:
        result = result + reso.ResoID+","
        result = result + reso.Name+","
        result = result + str(reso.Lat)+","
        result = result + str(reso.Lng)+","
        result = result + reso.Skills+";"
    return HttpResponse(result)

def searchResource(request):

    skill = request.GET["skill"]
    lat1 = request.GET["lat1"]
    lng1 = request.GET["lng1"]
    #return HttpResponse(skill)
    resources = Resource.objects.all()
    distance = 99999999999999
    result = 'Not found'
    for resource in resources:
        strings = resource.Skills.split('|')
        for string in strings:
            #print (string+' == ' + request)
            if (string == skill):
                #print ('Got ya! '+ string)
                newdistance = getDistance(lat1,lng1,resource.Lat, resource.Lng)
                #print (newdistance)
                if newdistance < distance:
                    distance = newdistance
                    result = str(resource.ResoID)
    #print (result)
    return HttpResponse(result)

def getDistance(lat1, lng1, lat2, lng2):
    R = 6373.0
    rlat1 = radians(float(lat1))
    rlon1 = radians(float(lng1))
    rlat2 = radians(float(lat2))
    rlon2 = radians(float(lng2))

    dlon = rlon2 - rlon1
    dlat = rlat2 - rlat1

    a = sin(dlat / 2)**2 + cos(rlat1) * cos(rlat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return (distance)

def saveResource(request):
    #print("Test")
    resources = Resource.objects.all()
    #print(resources.length)
    resoID = resources.__len__() + 1
    #print(ResoID)
    name = request.GET["Name"]
    lat = request.GET["Lat"]
    lng = request.GET["Lng"]
    skills = request.GET["Skills"]

    newResource = Resource(ResoID=resoID,Name=name,Lat=lat,Lng=lng,Skills=skills)
    newResource.save()
    return HttpResponse("OK")