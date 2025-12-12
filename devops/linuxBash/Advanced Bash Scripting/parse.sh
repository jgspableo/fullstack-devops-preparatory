#!/bin/bash
#Source: https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-LX0117EN-SkillsNetwork/labs/M3/L2/arrays_table.csv

# Read column 1 of arrays_table.csv into array arr1
# -d ","  : use comma as delimiter
# -f 1    : take the first field
arr1=($(cut -d "," -f 1 arrays_table.csv)) 

# Read column 2 of arrays_table.csv into array arr2
arr2=($(cut -d "," -f 2 arrays_table.csv)) 

# Read column 3 of arrays_table.csv into array arr3
arr3=($(cut -d "," -f 3 arrays_table.csv)) 

# Print the three arrays (for debugging/visibility)
echo "Array 1: ${arr1[@]}"
echo "Array 2: ${arr2[@]}"
echo "Array 3: ${arr3[@]}"

# Initialize diff_array with a header string "column_3"
# This will become the first line of the new column file
diff_array=("column_3")

# Get the number of lines in arrays_table.csv
# wc -l outputs "N filename", assigning to an array splits this into:
#   lines[0] = N (line count), lines[1] = filename
lines=($(wc -l arrays_table.csv))

# Loop from line 1 up to (line_count - 1)
# We start at i=1 to skip index 0, which in this script acts like a header
for ((i=1; i<${lines[0]}; i++)); do
    # For each row, compute: column3 - column2
    # and store it in diff_array at index i
    diff_array[$i]=$((arr3[$i] - arr2[$i]))
done

# Show the resulting difference array
echo "Difference of Array 2 and 3: ${diff_array[@]}"

# Create a new file column_3.txt and write the header (diff_array[0])
echo "${diff_array[0]}" > column_3.txt

# Append the rest of the differences, one per line
for ((i=1; i<${lines[0]}; i++)); do
  echo "${diff_array[$i]}" >> column_3.txt
done

# Horizontally merge original CSV and the new column_3.txt using comma as delimiter
# Result goes into report.csv
paste -d "," arrays_table.csv column_3.txt > report.csv

# Print a blank line, then show the contents of report.csv
echo " "
echo "Report.csv"
echo "$(cat report.csv)"
