var db = require('./db');
var slugGenerator = require('./slug-generator');

/* Our curated news section. Mostly fivejs at the moment. Note that in the very near
 * future, we will be saving fivejs feeds to news items.
 */
var News = {
  // Returns the most recent news items for display on the index page
  recent(cb) {
    db.query('SELECT * FROM articles ORDER BY created_at DESC LIMIT 10', [], cb)
  },
  
  published(limit, cb) {
    db.query('SELECT * FROM articles WHERE approved = false ORDER BY published_at DESC LIMIT $1',
      [limit],
      cb)
  },

  // Returns all news items, no pagination
  all(cb) {
    db.query('SELECT * FROM articles', [], cb)
  },

  allWithUsers(cb){
    db.query('SELECT articles.news, articles.url, articles.title, articles.slug, articles.body, users.name, users.avatar_url FROM articles LEFT JOIN users ON articles.user_id = users.id', [], cb)
  },

  // Creates a new news item
  create(title, body, url, cb) {
    db.query(
      "INSERT INTO articles (title, body, url, news) VALUES ($1, $2, $3, true);",
      [title, body, url],
      cb
    )
  },

  // Creates stories from a JSON object sent form FiveJS
  createFromEpisode(episodes, cb) {
    for(var i in episodes) {
      var story = episodes[i];
      story.slug = slugGenerator.createSlug(story.title);
      db.query(
        "INSERT INTO articles (title, slug, body, url, news) VALUES ($1, $2, $3, $4, true);",
        [story.title, story.slug, story.summary, story.url],
        function(){} // Is there anything to be done here?
      )
    }
    cb();
  }
}

module.exports = News;
