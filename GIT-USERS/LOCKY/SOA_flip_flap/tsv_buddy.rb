# Module that can be included (mixin) to create and parse TSV data
module TsvBuddy
  # @data should be a data structure that stores information
  #  from TSV or Yaml files. For example, it could be an Array of Hashes.
  attr_accessor :data

  # take_tsv: converts a String with TSV data into @data
  # parameter: tsv - a String in TSV format
  def take_tsv(tsv)
    tsv_arr, data = [], []
    
    # Per row
    r = tsv.split("\n");

    r.each do |e|
      tsv_arr.push(e.split("\t"));
    end
    
    field = tsv_arr.shift
    
    # Transfer tsv into field => value
    tsv_arr.each do |row|
        hash = {}
        
        row.each_with_index do |conlumn, i|
            hash[field[i]] = conlumn
        end
        
        data.push(hash)
    end
    
    @data = data
  end

  # to_tsv: converts @data into tsv string
  # returns: String in TSV format
  def to_tsv
    yaml = @data
    separator = {:tab => "\t", :newline => "\n"}
    field = []

    yaml[0].each do |k, v|
        field.push(k)
    end
    
    data = [field.join(separator[:tab])]

    yaml.each do |e|
        str = []
        
        e.each do |k, v|
            str.push(v)    
        end
        
        data.push(str.join(separator[:tab]))
    end
    
    data.push('').join(separator[:newline])
  end
  
end
