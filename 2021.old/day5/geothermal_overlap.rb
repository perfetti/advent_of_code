require 'pp'
require 'geometry'
# require 'ruby-geometry'

# [int, int][]
instructions = File.open('./input.txt').map(&:chomp).map{|line| line.split(' -> ').map{|s| s.split(',').map(&:to_i)}}
# pp instructions

lines = instructions.map do |instruction|
    [Geom::Point3d.new(*instruction[0]), Geom::Point3d.new(*instruction[1])]
end

pp lines