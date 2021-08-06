require_relative 'tsv_buddy'
require_relative 'yml_buddy'

class FlipFlap
  # Do NOT create an initialize method
  include TsvBuddy
  include YmlBuddy
  
end
