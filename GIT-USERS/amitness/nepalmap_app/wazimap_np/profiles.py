from collections import OrderedDict

from wazimap.geo import geo_data
from wazimap.data.tables import get_model_from_fields
from wazimap.data.utils import get_session, calculate_median, merge_dicts, get_stat_data, get_objects_by_geo, group_remainder


# ensure tables are loaded
import wazimap_np.tables  # noqa


PROFILE_SECTIONS = (
    'households',
)

COOKING_FUEL_RECODES = OrderedDict([
    ('WOOD', 'Wood'),
    ('LPG', 'LPG'),
    ('GUITHA', 'Guitha'),
    ('BIOGAS', 'Biogas'),
    ('KEROSENE', 'Kerosene'),
    ('ELECTRICITY', 'Electricity'),
    ('OTHERS', 'Others'),
    ('NOT_STATED', 'Not Stated')
])




def get_census_profile(geo_code, geo_level, profile_name=None):
    session = get_session()

    try:
        geo_summary_levels = geo_data.get_summary_geo_info(geo_code, geo_level)
        data = {}

        for section in PROFILE_SECTIONS:
            function_name = 'get_%s_profile' % section
            if function_name in globals():
                func = globals()[function_name]
                data[section] = func(geo_code, geo_level, session)

                # get profiles for province and/or country
                for level, code in geo_summary_levels:
                    # merge summary profile into current geo profile
                    merge_dicts(data[section], func(code, level, session), 
                                level)

        return data

    finally:
        session.close()


def get_households_profile(geo_code, geo_level, session):

    # cooking
    cooking_fuel_dict, total_households = get_stat_data(
        'main type of cooking fuel', geo_level, geo_code, session,
        recode=dict(COOKING_FUEL_RECODES),
        key_order=COOKING_FUEL_RECODES.values())
    total_wood = cooking_fuel_dict['Wood']['numerators']['this']

    return {
        'total_households': {
            'name': 'Households',
            'values': {'this': total_households},
        },
        'cooking_wood': {
            'name': 'Use wood for cooking',
            'numerators': {'this': total_wood},
            'values': {'this': round(total_wood / total_households * 100, 2)},
        },
        'cooking_fuel_distribution': cooking_fuel_dict
    }

