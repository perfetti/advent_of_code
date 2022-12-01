def main
    lines = File.open('./depths.txt').readlines
    currIndex = 0
    endIndex = lines.length - 2

    lastWindow = nil
    windowIncreases = 0


    while(currIndex < endIndex) do 
        currWindow = getWindow(currIndex, lines)
        
        if(lastWindow != nil && currWindow > lastWindow)
            windowIncreases += 1
        end

        lastWindow = currWindow
        currIndex += 1
    end

    puts windowIncreases
end


def getWindow(index, lines)
    [lines[index], lines[index + 1], lines[index + 2]].map(&:to_i).sum
end

main();