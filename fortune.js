function Fortune(files) {
    this.fortunes = [];
    this.append_files(files);
}

Fortune.prototype.append_files = function(files) {

    if(!files) {
        // Prevents from appending the current HTML document as a fortune...
        return;
    }

    files = files instanceof Array ? files : [files];

    for(var i in files) {
        this._append_file(files[i]);
    }
}

Fortune.prototype._append_file = function(file) {
    this.fortunes = [];
    var that = this;
    $.get(file, function(txt) {
        var lines = txt.split("\n");

        var index = that.fortunes.length;
        that.fortunes[index] = '';

        for(var i in lines) {
            if(lines[i] == '%') {
                // Remove the last \n
                that.fortunes[index] = that.fortunes[index].substr(0, that.fortunes[index].length - 1);
                index++;
                that.fortunes[index] = '';
                continue;
            }

            that.fortunes[index] += lines[i] + "\n";
        }

        console.log(that.fortunes[index]);
        if(that.fortunes[index] == "\n") {
            // Removes the last entry if it's empty (if the file ended with a %)
            that.fortunes.pop();
        }

    }, 'text').fail(function() {
        console.error('Invalid fortune file');
    });
    return this;
};

Fortune.prototype.empty = function() {
    this.fortunes = [];
    return this;
};

Fortune.prototype.next = function() {
    return this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
};
