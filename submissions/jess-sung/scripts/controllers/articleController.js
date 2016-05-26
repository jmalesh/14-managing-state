(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadById is a method on the articleController that takes ctx and next as parameters
  //we set a local function, that passes article as a parameter, to the variable
  //articleData where ctx object now has a new property called articles for which the value is now article
  //then we call next which moves to the next parameter
  //findWhere is a method on the Article object that takes three parameters field, value, callback,
  //which finds the data associated to the field in a database
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //setting locally scoped function to the authorData var what takes the parameter articlesByAuthor
  //and uses that value to be = to the ctx.articles object and then called the next function
  //we then do another findWhere methos that grabs the data associated with the field value of author
  //we are concatanating spaces that the url does not allow for but replacing ' ' with +
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //setting locally scoped function to the categoryData var what takes the parameter articlesInCategory
  //and uses that value to be = to the ctx.articles object and then called the next function
  //we then do another findWhere method that grabs the data associated with the field value of category
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadAll is a method that take ctx and next as parameters
  //we set the locally scoped functions that takes allArticles as a param and sets
  //it equal to the articleData var. It takes the Article.All array and sets it equal to the ctx.articles
  //we then call the next function
  //the if block validator checks to see is Article.all contains any articles and if it does, it sets ctx.article
  //equal to that array and then calls the next function
  //else if there s no data in Article.all, then we call the Article.fetchAll method using articleData as its callback function
  //fetchAll will refer to our articleData in our database to see if table rows have been added
  //if it has, then Article.all will be filled with that row data and the articleData callback function will be ran
  //if there is not table row data, we use $.getJSON call to grab out json data that is locally sourced to fil up the table data
  //and then it will fill our Article.all array and then run out articleData callback function
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
