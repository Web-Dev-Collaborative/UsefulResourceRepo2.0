# A Simple Django view
# pip install nocaptcha
from nocaptha import captcha as nocaptha
from django.http import HttpResponse
import jsons

"""
/your-url/ must be specified in url.py
"""


def validate_the_response(request):
    res = nocaptha.submit(
        request.POST["g-recaptcha"], "Your Secret Key", get_ip(request)
    )
    if not res.is_valid():
        # Return a json object to client
        return HttpResponse(jsons.dumps({"status": "400", "msg": "You are a robot."}))
    else:
        return HttpResponse(
            jsons.dumps({"status": "200", "msg": "You are not a robot"})
        )


"""
  get user's ip.
"""


def get_ip(request):
    """Returns the IP of the request, accounting for the possibility of being
    behind a proxy.
    """
    ip = request.META.get("HTTP_X_FORWARDED_FOR", None)
    if ip:
        # X_FORWARDED_FOR returns client1, proxy1, proxy2,...
        ip = ip.split(", ")[0]
    else:
        ip = request.META.get("REMOTE_ADDR", "")
    return ip
