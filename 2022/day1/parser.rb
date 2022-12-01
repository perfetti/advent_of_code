require 'pp'
carried_calories = []
temp_cal_store = 0
File.open("input.txt", "r") do |f|
  f.each_line do |line|
    if(line == "\n")
      carried_calories.push(temp_cal_store)
      temp_cal_store = 0
    else
      temp_cal_store += line.to_i
    end
  end
end

carried_calories.sort!
puts carried_calories.last(3).inject(:+)