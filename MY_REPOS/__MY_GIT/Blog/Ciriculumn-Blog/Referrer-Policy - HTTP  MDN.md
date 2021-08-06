# Referrer-Policy - HTTP | MDN

> The Referrer-Policy HTTP header controls how much referrer information (sent via the Referer header) should be included with requests. Aside from the HTTP header, you can set this policy in HTML.

## [Syntax](#syntax "Permalink to Syntax")

    Referrer-Policy: no-referrer
    Referrer-Policy: no-referrer-when-downgrade
    Referrer-Policy: origin
    Referrer-Policy: origin-when-cross-origin
    Referrer-Policy: same-origin
    Referrer-Policy: strict-origin
    Referrer-Policy: strict-origin-when-cross-origin
    Referrer-Policy: unsafe-url

#### Note

The original header name [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) is a misspelling of the word "referrer". The `Referrer-Policy` header does not share this misspelling.

## [Directives](#directives "Permalink to Directives")

`no-referrer`

The [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header will be omitted entirely. No referrer information is sent along with requests.

`no-referrer-when-downgrade`

Send the [origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Origin), path, and querystring in [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) when the protocol security level stays the same or improves (HTTP→HTTP, HTTP→HTTPS, HTTPS→HTTPS). Don't send the [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header for requests to less secure destinations (HTTPS→HTTP, HTTPS→file).

`origin`

Send the [origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Origin) (only) in the [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header.  
For example, a document at `https://example.com/page.html` will send the referrer `https://example.com/`.

`origin-when-cross-origin`

Send the [origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Origin), path, and query string when performing a [same-origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Same-origin_policy) request to the same protocol level. Send origin (only) for cross origin requests and requests to less secure destinations.

`same-origin`

Send the [origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Origin), path, and query string for [same-origin](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Glossary/Same-origin_policy) requests. Don't send the [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header for cross-origin requests.

`strict-origin`

Send the origin (only) when the protocol security level stays the same (HTTPS→HTTPS). Don't send the [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header to less secure destinations (HTTPS→HTTP).

`strict-origin-when-cross-origin` (default)

Send the origin, path, and querystring when performing a same-origin request. For cross-origin requests send the origin (only) when the protocol security level stays same (HTTPS→HTTPS). Don't send the [`Referer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTTP/Headers/Referer) header to less secure destinations (HTTPS→HTTP).

#### Note

This is the default policy if no policy is specified, or if the provided value is invalid (see spec revision [November 2020](https://github.com/whatwg/fetch/pull/1066)). Previously the default was `no-referrer-when-downgrade`.

`unsafe-url`

Send the origin, path, and query string when performing any request, regardless of security.

#### Warning

This policy will leak potentially-private information from HTTPS resource URLs to insecure origins. Carefully consider the impact of this setting.

## [Integration with HTML](#integration_with_html "Permalink to Integration with HTML")

You can also set referrer policies inside HTML. For example, you can set the referrer policy for the entire document with a [`<meta>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/meta) element with a [name](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/meta#attr-name) of `referrer`:

    <meta name="referrer" content="origin">

Or set it for individual requests with the `referrerpolicy` attribute on [`<a>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/a), [`<area>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/area), [`<img>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/img), [`<iframe>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/iframe), [`<script>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/script), or [`<link>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/link) elements:

    <a href="http://example.com" referrerpolicy="origin">

Alternatively, a `noreferrer` [link relation](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Link_types) on an `a`, `area`, or `link` element can be set:

    <a href="http://example.com" rel="noreferrer">

#### Warning

As seen above, the `noreferrer` link relation is written without a dash — `noreferrer`. When the referrer policy is specified for the entire document with a [`<meta>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/meta) element, it's written _with_ a dash: `<meta name="referrer" content="no-referrer">`.

## [Integration with CSS](#integration_with_css "Permalink to Integration with CSS")

CSS can fetch resources referenced from stylesheets. These resources follow a referrer policy as well:

- External CSS stylesheets use the default policy (`strict-origin-when-cross-origin`), unless it's overwritten via a `Referrer-Policy` HTTP header on the CSS stylesheet’s response.
- For [`<style>`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/HTML/Element/style) elements or [`style` attributes](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/API/ElementCSSInlineStyle/style), the owner document's referrer policy is used.

## [Examples](#examples "Permalink to Examples")

| Policy                            | Document                       | Navigation to                 | Referrer                       |
| --------------------------------- | ------------------------------ | ----------------------------- | ------------------------------ |
| `no-referrer`                     | https://example.com/page       | _anywhere_                    | _(no referrer)_                |
| `no-referrer-when-downgrade`      | https://example.com/page       | https://example.com/otherpage | https://example.com/page       |
| https://mozilla.org               | https://example.com/page       |
| **http**://example.org            | _(no referrer)_                |
| `origin`                          | https://example.com/page       | _anywhere_                    | https://example.com/           |
| `origin-when-cross-origin`        | https://example.com/page       | https://example.com/otherpage | https://example.com/page       |
| https://mozilla.org               | https://example.com/           |
| **http**://example.com/page       | https://example.com/           |
| `same-origin`                     | https://example.com/page       | https://example.com/otherpage | https://example.com/page       |
| https://mozilla.org               | _(no referrer)_                |
| `strict-origin`                   | https://example.com/page       | https://mozilla.org           | https://example.com/           |
| **http**://example.org            | _(no referrer)_                |
| **http**://example.com/page       | _anywhere_                     | http://example.com/           |
| `strict-origin-when-cross-origin` | https://example.com/page       | https://example.com/otherpage | https://example.com/page       |
| https://mozilla.org               | https://example.com/           |
| **http**://example.org            | _(no referrer)_                |
| `unsafe-url`                      | https://example.com/page?q=123 | _anywhere_                    | https://example.com/page?q=123 |

### [Specifying a fallback policy](#specifying_a_fallback_policy "Permalink to Specifying a fallback policy")

If you want to specify a fallback policy in any case the desired policy hasn't got wide enough browser support, use a comma-separated list with the desired policy specified last:

Referrer-Policy: no-referrer, strict-origin-when-cross-origin

In the above scenario, `no-referrer` will only be used if `strict-origin-when-cross-origin` is not supported by the browser.

Specifying multiple values is only supported in the `Referrer-Policy` HTTP header, and not in the `referrerpolicy` attribute.

## [Browser-specific preferences/settings](#browser-specific_preferencessettings "Permalink to Browser-specific preferences/settings")

### [Firefox preferences](#firefox_preferences "Permalink to Firefox preferences")

Firefox preferences can be used to configure the _default_ referrer policy. The preference names are version specific:

- Firefox version 59 and later: `network.http.referer.defaultPolicy` (and `network.http.referer.defaultPolicy.pbmode` for private networks)
- Firefox versions 53 to 58: `network.http.referer.userControlPolicy`

All of these settings take the same set of values: `0 = no-referrer`, `1 = same-origin`, `2 = strict-origin-when-cross-origin`, `3 = no-referrer-when-downgrade`.

## [Specifications](#specifications "Permalink to Specifications")

## [Browser compatibility](#browser_compatibility "Permalink to Browser compatibility")

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?body=%3C%21--+Tips%3A+where+applicable%2C+specify+browser+name%2C+browser+version%2C+and+mobile+operating+system+version+--%3E%0A%0A%23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F%0A%0A%23%23%23%23+What+did+you+expect+to+see%3F%0A%0A%23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F%0A%0A%0A%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60http.headers.Referrer-Policy%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FHeaders%2FReferrer-Policy%0A*+Report+started%3A+2021-04-04T06%3A21%3A19.362Z%0A%0A%3C%2Fdetails%3E&title=http.headers.Referrer-Policy+-+%3CPUT+TITLE+HERE%3E "Report an issue with this compatibility data")

|     | desktop | mobile |
| --- | ------- | ------ | ------- | ----------------- | ----- | ------ | --------------- | -------------- | ------------------- | ------------- | ------------- | ---------------- |
|     | Chrome  | Edge   | Firefox | Internet Explorer | Opera | Safari | WebView Android | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet |
| --- | ---     | ---    | ---     | ---               | ---   | ---    | ---             | ---            | ---                 | ---           | ---           | ---              |

|
`Referrer-Policy`

| ChromeFull support56 | EdgeFull support79 | FirefoxFull support50 | Internet ExplorerNo supportNo | OperaFull support43 | SafariFull support11.1 | WebView AndroidFull support56 | Chrome AndroidFull support56 | Firefox for AndroidFull support50 | Opera AndroidFull support43 | Safari on iOSNo supportNo | Samsung InternetFull support7.2 |
|

Default policy is `strict-origin-when-cross-origin`

| ChromeFull support85 | EdgeFull support85 | FirefoxFull support87 | Internet ExplorerNo supportNo | OperaFull support71 | SafariNo supportNo | WebView AndroidFull support85 | Chrome AndroidFull support85 | Firefox for AndroidFull support87 | Opera AndroidFull support60 | Safari on iOSNo supportNo | Samsung InternetNo supportNo |
|

same-origin

| ChromeFull support61 | EdgeFull support79 | FirefoxFull support52 | Internet ExplorerNo supportNo | OperaFull support48 | SafariFull support11.1 | WebView AndroidFull support61 | Chrome AndroidFull support61 | Firefox for AndroidFull support52 | Opera AndroidFull support45 | Safari on iOSNo supportNo | Samsung InternetFull support7.2 |
|

strict-origin

| ChromeFull support61 | EdgeFull support79 | FirefoxFull support52 | Internet ExplorerNo supportNo | OperaFull support48 | SafariFull support11.1 | WebView AndroidFull support61 | Chrome AndroidFull support61 | Firefox for AndroidFull support52 | Opera AndroidFull support45 | Safari on iOSNo supportNo | Samsung InternetFull support7.2 |
|

strict-origin-when-cross-origin

| ChromeFull support61 | EdgeFull support79 | FirefoxFull support52 | Internet ExplorerNo supportNo | OperaFull support48 | SafariFull support11.1 | WebView AndroidFull support61 | Chrome AndroidFull support61 | Firefox for AndroidFull support52 | Opera AndroidFull support45 | Safari on iOSNo supportNo | Samsung InternetFull support7.2 |

### Legend

Full support

Full support

No support

No support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

## [See also](#see_also "Permalink to See also")

[Source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
