
# TODO

Contributions welcome, please get stuck in!

### General

* Move `on_production()` to be a boolean in general_settings.py, rather than a function which has to be called each
  time.  This may be slightly tricky as `os.environ` is not necessarily available when settings is first imported, but
  it's nothing that `lazy()` can't fix :-).

### Bug Fixing

* Implement the FK Null Fix from dbindexer (which manipulates the query in the case a join is used for isnull).
* Make `MyModel.objects.filter(pk=1) | MyModel.objects.filter(pk=2)` correctly return an empty result.
  Currently returns both!
* Run `manage.py test djangae` to find other things that need doing.
* Unique constraints need to be more robust against Put() failures
* Unique constraints need to support the `unique_for_date` magic that Django does
* Add support for list fields to unique constraints
* Unique caching needs implementing to protect against common HRD issues
* Add a Cloud Storage file storage backend to supersede the blobstore one
* Add a mapreduce handler, and an API for creating and registering mapreduce tasks
* Add support for Django 1.7
* Implement a means to perform ancestor queries through the ORM. Need to think about the API
* More tests! Especially for unique constraints, unique caching and model inheritence
* Add a UniqueSupportMixin for models so that form validation works as normal and doesn't just throw on save()
* Write a lot of documentation on the datastore backend, complete with caveats, limitations, and how queries are translated
* Implement an API/Mixin/Custom Field for "expando" models - needs some thought
* Create a website on GitHub, come up with a release process (maybe)


### Special Indexing

This is what I've termed the old-style dbindexer magic that allow stuff like iexact to work. How it works in Djangae is
when you run a query on the dev_appserver (e.g. `username__iexact="bananas"`), an index is added to djangaeidx.yaml
(just like index.yaml). From that point onwards every save of the field should create an associated `_idx_***` field
storing a transformed version of the value. Special lookups (like iexact) will then use this field.

Status: 90% - the yaml file is generated during tests (although I haven't implemented the dev_appserver sandbox
circumvention yet). iexact is implemented.

### Unique Caching

This is implemented hackily and brokenly. We should follow the same logic as NDB here (with the in-context vs memcache
layer) but extend it to unique field values. We also need to make sure we follow the same logic with transactions as
they do to ensure they work correctly.

Status: 10% - needs a total rewrite, I have an uncommitted file that started stubbing this out. I just need to get
around to doing it

### Cross-kind Selects

We should be able to support a select that bridges a single join, on a single model provided the where does not cross
models. For example Permission.objects.values_list("user__username", "id"). We can do this while processing the result
set by gathering related keys, doing a single datastore Get(keys) and reading the resulting field value. In the above
example, after processing the auth_permission results, we can do a Get for the users, and update the result set. This
behaviour should be supported (to allow more of Django to work by default) but should log a warning in the Djangae slow
query log (see below).

Status: 0% - needs to be done to make the contrib.auth tests pass

### Slow Query Logging

We should have a special log for when Djangae performs an inefficient query, or if an unsupported ordering is requested.
This should be displayed in the terminal when running locally, but not on production. We should log in the following
situations:

 - The user does a cross-kind select (see above) - Info
 - The result set needs to be manipulated in Python to fulfil the query (this isn't necessarily slow, but we should be
   verbose to the user so they can perhaps better structure their query) - Info
 - An unsupported cross-table ordering is requested. Ideally we would raise an exception in this case, but many models
   in contrib do this and I'd rather tell the user that their ordering did not apply, than throw an exception and make
   the whole thing unusable - Warning
 - The query was totally unsupported (e.g. ManyToMany, join etc.) - Error

Status: 0% - needs to be done

### Ancestor queries, Expando models etc.

Ancestor queries do exist in our Djangoappengine fork, but the API could do with some improving and it all needs
implementing in Djangae. Preferably we could implement this at as high a level as possible.

Status: 0%

### Profiling

We need to profile and optimize all parts of the database. My aim is to not only outperform djangoappengine, but also
NDB for the same kind of queries. Totally doable (NDB is just a layer on top of Get/Put/Query/MultiQuery the same as
djangoappengine and Djangae)

Status: 0%
