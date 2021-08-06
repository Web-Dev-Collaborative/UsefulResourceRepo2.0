# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "xtractor/version"

Gem::Specification.new do |spec|
  spec.name          = "xtractor"
  spec.version       = Xtractor::VERSION
  spec.authors       = ["kamalpaneru"]
  spec.email         = ["kamalpaneru.15@gmail.com"]
  spec.files            = ["lib/xtract.rb"]

  spec.summary       = %q{Splits cells in an excelsheet images and extracts data.}
  spec.description   = %q{Xtractor was developed as a need to my own problem of inserting handwritten data from an excelsheet image to excel.And it does the same as described. }
  spec.homepage      = 'https://rubygems.org/gems/xtractor'
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.15.1"
  spec.add_development_dependency "rake", "~> 12.0.0"
  spec.add_development_dependency "rspec", "~> 3.6.0"

  spec.add_runtime_dependency "rmagick", "~> 2.16.0"
end
