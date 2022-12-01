# https://adventofcode.com/2021/day/3#part2
require 'pp'
require 'json'
counters = JSON.load(File.open('./bitCounters.json'))
lines = File.open('./diagnostic_output.txt').readlines.map(&:chomp)

mostCommonSet = File.open('./diagnostic_output.txt').readlines.map(&:chomp)
oxygenFound = false
oxyLine = nil

leastCommonSet = File.open('./diagnostic_output.txt').readlines.map(&:chomp)
co2Found = false
co2Line = nil

def getMostAndLeastCommonPerIndex(index, lines)
    acc = {
        "0" => 0,
        "1" => 0
    }
    lines.each do |line|
        acc[line[index]] ||= 0
        acc[line[index]] +=1;
    end
    puts acc
    return acc
end


lines.each_with_index do |_, index|
    puts 'Run#' + index.to_s
    counter = getMostAndLeastCommonPerIndex(index, lines);
    
    if counter['0'] > counter['1']
        mostCommonSet = oxygenFound ? mostCommonSet : mostCommonSet.select{|line| line[index] == '0'}
        leastCommonSet = co2Found ? leastCommonSet : leastCommonSet.select{|line| line[index] == '1'}
    else 
        mostCommonSet = oxygenFound ? mostCommonSet : mostCommonSet.select{|line| line[index] == '1'}
        leastCommonSet = co2Found ? leastCommonSet : leastCommonSet.select{|line| line[index] == '0'}
    end

    if(mostCommonSet.length == 1)
        oxygenFound = true
        oxyLine = mostCommonSet[0]
    end

    if(leastCommonSet.length == 1) 
        co2Found = true
        co2Line = leastCommonSet[0]
    end

    puts 'most common left ' + mostCommonSet.length.to_s, mostCommonSet
    puts 'least common left ' + leastCommonSet.length.to_s, leastCommonSet

    if(co2Found && oxygenFound)
        puts 'both found'
        break;  
    end
end


puts 'CO2 ' + co2Line + ' ' + co2Line.to_i(2).to_s
puts 'Oxy ' + oxyLine + ' ' + oxyLine.to_i(2).to_s
puts 'Combined ' + (co2Line.to_i(2) * oxyLine.to_i(2)).to_s