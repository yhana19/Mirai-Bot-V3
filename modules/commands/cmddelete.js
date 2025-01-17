let fs = require('fs');

module.exports.config = {
  name: "cmdelete",
  version: "1.0",
  credits: "Blake Cyphrus󱢏",//don't care if baguhin moto mwuah☺️
  description: "Delete a command by filename.",
  commandCategory: "Utility",
  usages: "<filename>",
  hasPermission: 2,
  cooldowns: 5,
};

module.exports.run = function ({ api, event, args }) {
  const { threadID, senderID } = event;

  // Check permissions or senderID to restrict who can use this command
  const allowedUsers = ["61564459952029",""]; // Replace with your user ID
  if (!allowedUsers.includes(senderID)) {
    return api.sendMessage("You are not authorized to use this command.", threadID);
  }

  // Check if the command is invoked with the correct number of arguments
  if (args.length !== 1) {
    return api.sendMessage("Please use the correct format: #cmdelete <filename>", threadID);
  }

  const filename = args[0];

  // Construct the file path within the modules/commands directory
  const filePath = `./modules/commands/${filename}`;

  // Log the file path for debugging
  console.log(`Attempting to delete: ${filePath}`);

  try {
    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      api.sendMessage(`Command ${filename} has been deleted.`, threadID);
      console.log(`Deleted: ${filePath}`);
    } else {
      api.sendMessage(`File ${filename} not found. No commands were deleted.`, threadID);
      console.log(`File not found: ${filePath}`);
    }
  } catch (error) {
    api.sendMessage("An error occurred while deleting the command.", threadID);
    console.error(error);
  }
};
