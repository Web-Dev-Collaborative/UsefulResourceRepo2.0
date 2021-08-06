# Module that can be included (mixin) to create and parse TSV data
module TsvBuddy
  # @data should be a data structure that stores information
  #  from TSV or Yaml files. For example, it could be an Array of Hashes.
  attr_accessor :data

  # take_tsv: converts a String with TSV data into @data
  # parameter: tsv - a String in TSV format
  def take_tsv(tsv)
    data_arr=[]
    tsv_arr = tsv.lines
    header_arr = tsv_arr[0].chomp("\n").split("\t")

    (1..tsv_arr.size-1).each do |i|
      row_info = tsv_arr[i].chomp("\n").split("\t")
      data_arr << (header_arr.zip(row_info)).to_h
    end
    @data = data_arr
  end

  # to_tsv: converts @data into tsv string
  # returns: String in TSV format
  def to_tsv

    tsv = @data[0].keys.join("\t") + "\n"
    @data.each do |hash|
      tsv += hash.values.join("\t") + "\n"
  end
  tsv
end
end
