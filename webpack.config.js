const webpack = require("webpack");
const path = require("path");
//const WebpackCleanPlugin = require("webpack-cleanup-plugin");
const BUILD_DIR = path.resolve(__dirname, "public/views");
const SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
  entry: {
    // "indexEntry": path.join(SRC_DIR, "index.jsx"),
    // "profileEntry": path.join(SRC_DIR, "profile/profile_index.jsx"),
    // "popularEntry": path.join(SRC_DIR, "popular/popular_index.jsx"),
    // "bySourceEntry": path.join(SRC_DIR, "bysource/bysource_index.jsx")

    // "indexEntry": path.join(SRC_DIR, "index.jsx"),
    // "registerEntry": path.join(SRC_DIR, "register_index.jsx"),
    // "resetEntry": path.join(SRC_DIR, "reset_index.jsx"),
    // "userEntry": path.join(SRC_DIR, "user_index.jsx"),
    // "publicUserProfileEntry": path.join(SRC_DIR, "public_user_profile_index.jsx"),
    // "forgotEntry": path.join(SRC_DIR, "forgot_index.jsx"),
    // "errorEntry": path.join(SRC_DIR, "error_index.jsx"),
    // "browseEntry": path.join(SRC_DIR, "browse_index.jsx"),
    // "editEntry": path.join(SRC_DIR, "edit_index.jsx")
  },
  output: {
    path: path.join(BUILD_DIR, "dist"),
    filename: "[name].js"
  },
  watch: false,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: "babel"
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true
  }
};
