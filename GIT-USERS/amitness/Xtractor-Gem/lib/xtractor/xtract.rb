require "rubygems"
require "rmagick"

module Xtractor
  class Execute

    def initialize(image)
      img = Magick::Image::read(image).first
      if %w(TIFF).include? img.format
        crop_throw(img)
      else
        img.write('Conv_img.tif')
        img = Magick::Image::read('Conv_img.tif').first
        crop_throw(img)
      end
    end

    def crop_throw(img)
      img = img.resize_to_fit(2500,906)
      box = img.bounding_box
      img.crop!(box.x, box.y, box.width, box.height)
      start(img)
    end

    def start(img)
      store_line_rows = (0..img.rows-1).inject([]) do |arr, line_index|
      threshold = (img.columns*0.10).floor
      arr << line_index if img.get_pixels(0, line_index, (threshold), 1).select{|pixel|
      pixel.red < 63000 }.length >= threshold*0.95
      arr
      end


      store_line_columns = (0..img.columns-1).inject([])do |arr, line_index|
      threshold = (img.rows*0.10).floor
      arr << line_index if img.get_pixels(line_index, 0, 1, (threshold)).select{|pixel|
      pixel.red < 63000 }.length >= threshold*0.95
      arr
     end



      columns_filter = store_line_columns[1..-1].inject( [[ (store_line_columns[0]),(store_line_columns[0]) ]]) do |arr, line|
      if line == arr.last[1]+1
        arr.last[1] = line
      else
        arr << [line,line]
      end
      arr
      end


      rows_filter = store_line_rows[1..-1].inject( [[ (store_line_rows[0]), (store_line_rows[0] )]]) do |arr, line|
      if line == arr.last[1]+1
        arr.last[1] = line
      else
        arr << [line,line]
      end
      arr
      end


      Dir.mkdir('cell-files') if !File.exists?('cell-files')

      output_file = File.open('table.txt', 'w')

      rows_filter[0..-2].each_with_index do |row, i|
        text_row = []
      columns_filter[0..-2].each_with_index do |column, j|
        x,y= column[1], row[1]
        w,h= columns_filter[j+1][0]-x, rows_filter[i+1][0]-y

      Magick::Image.constitute(w, h, "RGB", img.get_pixels(x,y,w,h).map{ |pixel|
          [pixel.red, pixel.green, pixel.blue]}.flatten).write("cell-files/#{j}x#{i}.tif") do |out|
              out.depth=8
          end

      `tesseract cell-files/#{j}x#{i}.tif cell-files/#{j}x#{i} `


      text_row << File.open("cell-files/#{j}x#{i}.txt", 'r').readlines.map{|line| line.strip}.join(" ")

      end

      output_file.puts( text_row.join("\t"))
      end
      output_file.close
    end

  end
end
