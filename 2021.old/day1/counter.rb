# Data comes from 
# https://adventofcode.com/2021/day/1/input
file = 
lastDepth = nil;
numberOfIncreases = 0;

File.open('./depths.txt').each do |line|
    currDepth = line.to_i
    if (lastDepth != nil) && (lastDepth < currDepth)
        numberOfIncreases += 1
    end
    lastDepth = currDepth
end

puts numberOfIncreases