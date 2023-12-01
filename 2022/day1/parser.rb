require 'pp'
# carried_calories = []
# temp_cal_store = 0
result = IO.readlines("input.txt").reduce([0, []]) do |acc, line|
  if(line == "\n")
    acc[1] << acc[0]
    acc[0] = 0
  else
    acc[0] += line.to_i
  end
  acc
end

pp result
IO.readlines("input.txt").each do |line|
  if(line == "\n")
    carried_calories.push(temp_cal_store)
    temp_cal_store = 0
  else
    temp_cal_store += line.to_i
  end
end

carried_calories.sort!
puts carried_calories.last(3).inject(:+)