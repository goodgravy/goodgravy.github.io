---
date:  "2017-08-01T00:00:00Z"
keywords:  ["tech"]
tags:  []
title:  "Injecting into transient FactoryGirl attributes"
thumbnailImage:  "https://res.cloudinary.com/dshgddh17/c_lfill,g_center,h_280,w_280/jmsbrdy.com/factory.jpg"
thumbnailImagePosition:  "right"
---

I was just writing some code which parses a URL in order to extract a piece of the path.

When working correctly, the code under test takes a URL something like this:

```plain
http://site.com/.well-known/pki-validation/4b1706977f59ffe3c1ddf282bbee6f45.txt
```

… and returns just the hash-like part of the path: `4b1706977f59ffe3c1ddf282bbee6f45`.

Creating factories to effectively test it was surprisingly fiddly! Here are the options I considered and what worked for me – in the hope it's of some use to you.

## Static value

The simplest approach would be to just use a static value for the URL in the factory:

```ruby
factory :response do
  ssl_http_url "http://site.com/.well-known/pki-validation/4b1706977f59ffe3c1ddf282bbee6f45.txt"
end
```

Then, in my tests I could do something like:

```ruby
expect(my_class.parse_response).to eq('4b1706977f59ffe3c1ddf282bbee6f45')
```

Pros | Cons
-----|-------
**super** simple | URL never changes: we're not exercising the code as much as we might
 | we need to look at the factory definition to know what the correct subpath is

Overall, a weak but workable approach.

## Dynamic value: sequence

To address these problems (kind-of), we could use a dynamic value with a sequence, like so:

```ruby
factory :response do
sequence(:ssl_http_url) { |n| "http://site.com/.well-known/pki-validation/#{n}.txt" }
end
```

This would generate URLs like so:

* `http://site.com/.well-known/pki-validation/1.txt`
* `http://site.com/.well-known/pki-validation/2.txt`
* `http://site.com/.well-known/pki-validation/3.txt`
* etc.

Pros | Cons
-----|-------
 | the generated URLs are unrealistic
 | no way to **reliably** know what the subpath should be

Overall, this is an even weaker approach than a static value. For the test code to know what subpath it should expect your code to produce, we have to rely on the incrementing sequence numbers. But what happens if you add a `before` block which creates a new `response`? All of a sudden all your expectations have off-by-one errors in their expectations.

## Dynamic value: random URL

How about the factory randomly generates a URL of the right form?

```ruby
factory :response do
  ssl_http_url "http://#{ Faker::Internet.domain_name }/.well-known/pki-validation/#{ Faker::Crypto.md5 }.txt"
end
```

This would generate URLs like so:

* `http://gaylordmraz.io/.well-known/pki-validation/e8bfe6eda36585d2d18bb665096c16da.txt`
* `http://boyle.org/.well-known/pki-validation/16fe4249b256a74bc10144542b35ea5e.txt`
* `http://faheylakin.co/.well-known/pki-validation/7434184363b29d07dac7a11698bf86fe.txt`

They are realistic _and_ they change, which means your code is better exercised.

However, the problem now is that the test code doesn't know what value to expect. Because the md5 hash which forms the subpath is random, we don't know if the code under test is doing the right thing without reimplementing the parsing logic in the test itself!

Implementing a shadow version of the production code logic just to test the production code is a nightmarish smell.

## Dynamic value: injecting a value

What I really wanted was for the URL to be randomly generated, but for the test code to know what subpath value to expect.

FactoryGirl has a handy way of achieving this, but unfortunately it's documented in a confusing manner.

**Transient** or **ignored** attributes are properties which you can set on your FactoryGirl factories, but which don't need to exist on the underlying class. They aren't available for use on the generated objects either – they exist only in the scope of generating the object.

The confusion comes in because they're called ignored attributes in [version 4.4.0](https://github.com/thoughtbot/factory_girl/blob/v4.4.0/GETTING_STARTED.md#transient-attributes) but transient attributes in [version 4.5.0](https://github.com/thoughtbot/factory_girl/blob/v4.5.0/GETTING_STARTED.md#transient-attributes), which breaks semver….

However, with a factory defined like so:

```ruby
factory :response do
  ssl_http_url { "http://#{ Faker::Internet.domain_name }/.well-known/pki-validation/#{url_subpath}.txt" }

  # if you're using FactoryGirl < 4.5.0
  ignore do
    url_subpath { Faker::Crypto.md5 }
  end
end
```

You can pass in a value for `url_subpath` and test to your heart's content, e.g.:

```ruby
subpath = Faker::Crypto.md5
response = FG.create(:response, url_subpath: subpath)
expect(my_class.parse_response).to eq(subpath)
```

Pros | Cons
-----|-------
URLs are randomised |
generated URLs are realistic |
test code knows what subpath to expect |
