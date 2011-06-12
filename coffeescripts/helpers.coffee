Helpers =
  # Generate a random number. Max length is the largest
  # value the random number will go to. This generator
  # includes 0 in the range.
  generateRandomNumber: (maxLength) ->
    return Math.floor(Math.random() * ++maxLength)

# Logging shortcut
l = (v) ->
  return if !console and !console.log
  console.log(v)