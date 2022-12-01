# data from https://adventofcode.com/2021/day/2/input
directions = File.open('directions.txt')

xPos = 0
yPos = 0
aim = 0

directions.readlines.each do |line|
    direction, _distance, *remainder = line.split()
    distance = _distance.to_i
    case(direction) 
    when 'forward'
        xPos += distance;
        yPos += distance * aim;
    when 'up'
        aim -= distance;
    when 'down'
        aim += distance;
    end
end

puts xPos * yPos