const resolvers = {
  /*
    All our query resolver for each query we need to define resolver with same name
  */
  Query: {
    getAuthors: async (_, args, context) => {
      return await context.callToMysql("select * from authors");
    },
    author: async (_, args, context) => {
      const result = await context.callToMysql(
        "select * from authors where id =" + args.id
      );
      return result[0];
    },
  },

  /*
    All our Mutation resolver for each mutation (add or update query) we need to define resolver with same name
  */
  Mutation: {
    createAuthor: async (_, args, context) => {
      const result = await context.callToMysql(
        "INSERT INTO `authors` (`name`, `email`) VALUES ('" +
          args.name +
          "', '" +
          args.email +
          "');"
      );
      return result.affectedRows ? true : false;
    },
    createBook: async (_, args, context) => {
      const result = await context.callToMysql(
        "INSERT INTO `books` (`name`, `type`, `authorId`) VALUES ('" +
          args.name +
          "', '" +
          args.type +
          "', '" +
          args.authorId +
          "');"
      );
      return result.affectedRows ? true : false;
    },
  },

  /*
    All our relation resolvers
    ex: if you look at author type carefully

    type Author {
      id: Int
      name: String
      email: String
      books: [Book!]
    }
    here we have defined books as type of books, but we are not storing any information of book in our author table
    in that case how will those data populate in query result?
    so for that solution we need to define custom resolvers like below that will tell us how we will get data of books.
    so our custome resolver will looks like
    Author <== type name
      books  <=== field name for which we want to resolve our data
    now we do not store any data in our author table for books but from books table with authorId we can retrive which books are written by author.
    So we will fire query on books and from author fields we will use "id" in where and we will get all fields for books.
    Here "parent" will have all the fields from author table that we can use.

    So now when we will call author with id = 1 first it will get an author from author table all fields
    and for books it will call Author.books resolver with available fields and then resolve books data.

    Note: Look carefully that this relations are not inside Query or Mutation.
  */
  Author: {
    books: async (parent, args, context) => {
      return await context.callToMysql(
        "select * from books where authorId =" + parent.id
      );
    },
  },
  Book: {
    author: async (parent, args, context) => {
      const result = await context.callToMysql(
        "select * from authors where id =" + parent.authorId
      );
      return result[0];
    },
  },
};

export default resolvers;
