# Module that can be included (mixin) to create and parse TSV data
module YamlBuddy
  require 'yaml'
  # @data should be a data structure that stores information
  #  from TSV or Yaml files. For example, it could be an Array of Hashes.
  attr_accessor :data

  # Process yml string.
  # Return: a array of hash.
  def take_yaml(yml)
    @data = YAML.load(yml)
  end
  
  # converts @data into yml string
  # Return: yml format string
  def to_yaml
    @data.to_yaml
  end
end
