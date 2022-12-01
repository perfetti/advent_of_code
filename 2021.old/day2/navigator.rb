# data from https://adventofcode.com/2021/day/2/input
directions = File.open('directions.txt')

xPos = 0
yPos = 0

directions.readlines.each do |line|
    direction, distance, *remainder = line.split()

    case(direction) 
    when 'forward'
        xPos += distance.to_i;
    when 'up'
        yPos -= distance.to_i;
    when 'down'
        yPos += distance.to_i;
    end
end

puts xPos * yPos