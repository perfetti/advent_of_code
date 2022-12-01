require 'pp'
require 'json'

# This will be a {0: int, 1: int} count of bits
bitCounters = [];
def bitCounter
    {
        0 => 0,
        1 => 0
    }
end
lines = File.open('diagnostic_output.txt').readlines
lines.each do |line|
    chars = line.chomp.chars
    chars.each_with_index do |bit, index|
        if(bitCounters[index] == nil)
            bitCounters[index] = bitCounter()
        end
        bitCounters[index][bit.to_i] += 1
    end
end

most = ''
least =''

bitCounters.each do |counter|
    if counter[0] > counter[1]
        most += '0'
        least += '1'
    elsif counter[1] > counter[0]
        most += '1'
        least += '0'
    else
        throw new Error('This should not have happened')
    end
end

File.write('./bitCounters.json', bitCounters.to_json)

puts 'most  ' + most
puts 'least ' + least

mostAsInt = most.to_i(2)
leastAsInt = least.to_i(2)
puts 'Gamma Rate, ' + mostAsInt.to_s
puts 'Epsilon Rate, ' + leastAsInt.to_s

puts 'Final Answer ' + (mostAsInt * leastAsInt).to_s