# Copy table from Excel generate Markdown by pasting Data

Copy a table in Excel and paste it as a Markdown table.

## Column Alignments

You can optionally specify column alignment information by prepending one of the following to the column heading names in Excel:

* ^c  - center alignment
* ^r  - right alignment
* ^l   - left alignment (the default)

For example: enter the following in Excel to right-align the second column and center-align the third column:

| environment | ^rdb_date | ^capp_date |
| ----------- | --------- | ---------- |
| prd         | 5/1/2023  | 5/1/2023   |
| qa          | 5/1/2023  | 5/1/2023   |
| uat         | 5/1/2023  | 5/1/2023   |

This will produce the following markdown table when pasted:

```markdown
| environment |  db_date | app_date |
| ----------- | -------: | :------: |
| prd         | 5/1/2023 | 5/1/2023 |
| qa          | 5/1/2023 | 5/1/2023 |
| uat         | 5/1/2023 | 5/1/2023 |
```