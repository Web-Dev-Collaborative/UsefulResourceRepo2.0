import getopt
import json
import re
import sys

'''
Script to manipulate the properties of each Local in the local_fix.geojson file
in the geo repository and convert each to the format needed for NepalMap output as local.geojson
'''


def convert_json(input_file, output_file):
    with open(input_file, 'r') as data_file:
        data = json.load(data_file)

        def build_wazimap_feature(feature):
            old_type = feature['type']
            old_geometry = feature['geometry']
            old_properties = feature['properties']

            code = str(old_properties['DDGN'])
            name = str(old_properties['FIRST_GaPa']).title()
            division = str(old_properties['FIRST_Type']).title()
            parent_name = str(old_properties['FIRST_DIST']).title()
            parent_code = '{}-{}'.format('dis', old_properties['FIRST_DCOD'])
            new_properties = {
                'code': '{}-{}'.format('loc', code),
                'name': name,
                'geoid': '{}-{}'.format('loc', code),
                'level': 'local',
                'division': division,
                'parent_name': parent_name,
                'parent_code': parent_code
            }
            return {
                'type': old_type,
                'geometry': old_geometry,
                'properties': new_properties
            }

        features = list(map(lambda f: build_wazimap_feature(f),
                              data['features']))

        len(features)
        new_collection = dict(type=data['type'], features=features)
        
        with open(output_file, 'w') as json_out:
            json.dump(new_collection, json_out, ensure_ascii=False)

    print('Done!')


def main(args):
    inputjson = ''
    outputjson = ''
    try:
        opts, args = getopt.getopt(args, 'hi:o:',
                                   ['inputjson=', 'outputjson='])
    except getopt.GetoptError:
        print('python set_local_geojson_properties.py -i <inputjson> -o <outputjson>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('python set_local_geo_properties.py '
                  '-i <inputjson> '
                  '-o <outputjson>')
            sys.exit()
        elif opt in ('-i', '--inputjson'):
            inputjson = arg
        elif opt in ('-o', '--outputjson'):
            outputjson = arg

    convert_json(inputjson, outputjson)


if __name__ == '__main__':
    main(sys.argv[1:])
