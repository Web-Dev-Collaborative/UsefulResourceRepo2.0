module YmlBuddy
    
  attr_accessor :data

  require 'yaml'
      
  def take_yaml(yml)
     #this method takes a Yaml string and create a data structure to put into `@data`.
     #You should be able to do this with one line of code using the `yaml` library's load method.
     @data = YAML::load(yml)
  end
  
  def to_yaml
    #: this method should return `@data` in Yaml format.
    @data.to_yaml
  end

end