const resolvers = {
  Query: {
    getAuthors: async (_, args, context) => {
      return await context.callToMysql("select * from authors");
    },
  },
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
  },
};

export default resolvers;
