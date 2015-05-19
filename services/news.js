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
    db.query('SELECT * FROM articles WHERE approved = true ORDER BY published_at DESC LIMIT $1',
      [limit],
      cb)
  },

  pendingApproval(cb) {
    db.query('SELECT * FROM articles where approved IS NULL ORDER BY created_at ASC', [], cb)
  },
  // Returns all news items, no pagination
  all(cb) {
    db.query('SELECT * FROM articles', [], cb)
  },

  publishedWithUsers(cb){
    db.query('SELECT a.news, a.url, a.title, a.slug, a.body, u.name, u.avatar_url FROM articles as a LEFT JOIN users as u ON a.user_id = u.id WHERE a.approved = true ORDER BY published_at DESC', [], cb)
  },

  approve(id, cb) {
    db.query('UPDATE articles SET approved = true, published_at = current_timestamp WHERE id = $1;', [id], cb)
  },

  deny(id, cb) {
    db.query('UPDATE articles SET approved = false WHERE id = $1;', [id], cb)
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
        "INSERT INTO articles (title, slug, body, url, published_at, news, approved) VALUES ($1, $2, $3, $4, current_timestamp, true, true);",
        [story.title, story.slug, story.summary, story.url],
        function(){} // Is there anything to be done here?
      )
    }
    cb();
  },

    findBySlug(slug, cb) {
      db.query('SELECT id FROM articles WHERE slug = $1', [slug], cb)
    }
}

module.exports = News;
