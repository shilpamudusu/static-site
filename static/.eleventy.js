module.exports = function (eleventyConfig) {
    // Passthrough copies
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/assets");
  
    return {
      dir: {
        input: "src",
        output: "dist",
        includes: "_includes",
      },
    };
  };
  