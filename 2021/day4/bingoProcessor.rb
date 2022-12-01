data = File.open('./data.txt').readlines.map(&:chomp);

# Cell = { x: int, y: int }

class Board
    attr_accessor :marked_cells 
    attr_accessor :cells


    def initialize(lines)
        @marked_cells = {};
        @cells = {}

        lines.each_with_index do |line, yPos|
            numbers = line.split(' ').map(&:to_i)
            if(numbers.length == 0)
                next
            end

            numbers.each_with_index do |number, xPos|
                @cells[number] = {x: xPos, y: yPos}
            end
        end
    end

    def addNumber(number)
        cell = @cells[number]
        @marked_cells[cell.x][cell.y] = true
    end



    def checkComplete
    end


    self.winningCombos = [
        [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
        [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
        [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
        [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
        [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
    ]
end


# These are the draws that happen later
draws = data[0].split(',').map(&:to_i)

# Initialize board storage
boards = []

# This is where we keep board data
board_setup_data = data[0...-1]

board_setup_data.each_slice(6) do |batch|
    boards.push(Board.new(batch))
end