// This Code listens to the "paste" event on an 
// HTML element with the ID "editor" and converts 
// pasted tabular data into markdown format.

var editor = document.getElementById("editor")

// Takes an array of rows and a column index and returns 
// the maximum width of the values in that column
function columnWidth(rows, columnIndex)
{
  return Math.max.apply(null, rows.map(
    function (row)
    {
      return row[columnIndex].length
    }
  ))
}

// Always returns true in this implementation
// TODO: find a way to know when is not a table
function looksLikeTable(data)
{
  return true
}

editor.addEventListener("paste",
  function (event)
  {
    // retrieving the text data from the clipboard
    var clipboard = event.clipboardData
    var data = clipboard.getData('text/plain')

    // removing any trailing newline characters, if present.
    data = data.replace(/(?:[\n\u0085\u2028\u2029]|\r\n?)$/, '');

    // Check if data looks like a table
    if (looksLikeTable(data))
    {
      event.preventDefault()
    }
    else
    {
      return
    }

    // pasted data is split into rows and columns,
    var rows = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(
      function (row)
      {
        console.log(row)
        return row.split("\t")
      }
    )

    var colAlignments = []

    // The maximum width of each column is calculated using the columnWidth function
    var columnWidths = rows[0].map(
      function (column, columnIndex)
      {
        var alignment = "l"
        var re = /^(\^[lcr])/i
        var m = column.match(re)

        if (m)
        {
          var align = m[1][1].toLowerCase()

          if (align === "c")
          {
            alignment = "c"
          }
          else if (align === "r")
          {
            alignment = "r"
          }
        }

        colAlignments.push(alignment)
        column = column.replace(re, "")
        rows[0][columnIndex] = column

        return columnWidth(rows, columnIndex)
      }
    )

    // rows are formatted into markdown with each column
    // padded to its maximum width using spaces
    var markdownRows = rows.map(
      function (row, rowIndex)
      {
        // | Name         | Title | Email Address  |
        // |--------------|-------|----------------|
        // | Jane Atler   | CEO   | jane@acme.com  |
        // | John Doherty | CTO   | john@acme.com  |
        // | Sally Smith  | CFO   | sally@acme.com |
        return "| " + row.map(function (column, index)
        {
          return column + Array(columnWidths[index] - column.length + 1).join(" ")
        }).join(" | ") + " |"
        row.map

      }
    )

    // row separator is added based on the column alignments
    markdownRows.splice(1, 0, "|" + columnWidths.map(
      function (width, index)
      {
        var prefix = ""
        var postfix = ""
        var adjust = 0
        var alignment = colAlignments[index]
        if (alignment === "r")
        {
          postfix = ":"
          adjust = 1
        } else if (alignment == "c")
        {
          prefix = ":"
          postfix = ":"
          adjust = 2
        }
        return prefix + Array(columnWidths[index] + 3 - adjust).join("-") + postfix
      }
    ).join("|") + "|")

    // markdown text is set as the value of the HTML element with the ID "editor" 
    event.target.value = markdownRows.join("\n")

    // the function returns false to prevent the default paste behavior
    return false
  }
)