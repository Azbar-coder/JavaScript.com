tests = `
var js = require('/courses/helper/index.js');

describe('set_a_var', function(){
  var message, errorMessage;

  before(function() {
    var setup = "";
    js.evaluate(setup);

    try {
      message = js.evaluate(code);
    } catch(e) {
      errorMessage = e.message;
    }
  });

  after(function() {
    js.evaluate("alert = _alert");
  });


  details(function() {
    return {
      output: message
    };
  });

  js.verify(code);

  it('f_no_var_keyword', function(){
    js.assert(code.match(/var/));
  });

  it('f_name_blank', function(){
    js.assert(js.evaluate('name'));
  });

  it('f_name_not_string', function(){
    var name = js.evaluate('name');
    js.assert(typeof(name) === 'string');
  });

  it('passed all tests', function() {
    js.state.username = js.evaluate('name');
  });

  details('state', function() {
    return {
      username: js.state.username
    };
  });
});
`

failures = {
  "f_error": {
    "message": "Uh oh, it looks like your code won't run. Here's the error message we're getting"
  },
  'f_no_var_keyword': {
    'message': 'Whoops. We did not use the `var` keyword when setting our variable.',
    'hint': ""
  },
  'f_name_blank': {
    'message': 'Almost, but we did not set our name to our variable we created.',
    'hint': ""
  },
  'f_name_not_string': {
    'message': 'Hold up. It looks like we entered the name not as a string.',
    'hint': ""
  }
};

module.exports = {
  'title': 'Variables',
  'instructions': 'Set a variable named `name` to your name. Use the `var` scope.',
  'tests': tests,
  'failures': failures,
  'answer': "var test = 'dan';"
};