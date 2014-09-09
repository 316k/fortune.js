fortune.js
==========

A javascript fortune reader.

## Usage

```javascript
    // Create an empty fortune reader
    var fortune = new Fortune();

    // Load files
    fortune.append_files(["my-fortune-file", "more/my-other-fortune-file"]);
    // Add another file
    fortune.append_files("yet-another-fortune-file");

    // Or load the files on fortune reader creation
    var fortune = new Fortune(["my-fortune-file", "more/my-other-fortune-file"]);
    var fortune = new Fortune("yet-another-fortune-file");

    // Read a fortune
    alert(fortune.next());

    // Clear the fortunes and load another file
    fortune.empty().append_files('a-fortune-file');
```
