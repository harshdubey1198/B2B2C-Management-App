// const customerFilter  = (searchQuery) => {
//     if(!searchQuery){
//         throw new Error('Search query is Required')
//     }

//     return {
//         $or: [
//             { firstName: { $regex: searchQuery, $options: "i" } },
//             { email: { $regex: searchQuery, $options: "i" } },
//         ],
//     }
// }

// module.exports = { customerFilter }

module.exports = {
    buildFilter: (data) => {
      const filterObj = {};
  
      // Generic Filters
      if (data.keyword) {
        filterObj.$or = [
          { name: { $regex: data.keyword, $options: "i" } },
          { email: { $regex: data.keyword, $options: "i" } },
        ];
      }
  
      return filterObj;
    },
};
  