Node Module For ServiceNow API
==============================

Docs for api available from [ServiceNow website](http://wiki.servicenow.com/index.php?title=REST_API)

Inspired by [service_now ruby gem](https://github.com/YaleSTC/service_now) for use at Yale University.

Currently Supports:

* Making queries on tables
* Wrappers for "incident" and "user" tables
* Can fetch using generic table format as well.

## Usage
* Objects returned in same json format as servicenow json api

```
var options = {
    user: process.env.SN_USERNAME, 
    pass: process.env.SN_PASSWORD, 
    instance: process.env.SN_INSTANCE
};

var ServiceNow = require('servicenow')(options);
var Incident = ServiceNow.Incident;

Incident.find('INC0123456', function(err, incident) {
    console.log(incident.description);
});
```

## Bugs and/or Feature Requests
* Create an issue


## Contributing
1. Fork it!
2. Create a feature branch (`git checkout -b cool-new-feature`)
3. Commit and push
4. Create new Pull Request