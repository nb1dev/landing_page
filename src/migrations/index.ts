import * as migration_20260121_140435 from './20260121_140435';
import * as migration_20260408_091809 from './20260408_091809';
import * as migration_20260428_122159 from './20260428_122159';
import * as migration_20260428_131604 from './20260428_131604';
import * as migration_20260429_bio_groups_uuid from './20260429_bio_groups_uuid';
import * as migration_20260429_biology_groups from './20260429_biology_groups';
import * as migration_20260429_fix_bio_groups_v from './20260429_fix_bio_groups_v';
import * as migration_20260429_price_break_block from './20260429_price_break_block';
import * as migration_20260429_variant_full_fields from './20260429_variant_full_fields';
import * as migration_20260430_074534 from './20260430_074534';
import * as migration_20260430_092252 from './20260430_092252';
import * as migration_20260430_price_break_update from './20260430_price_break_update';
import * as migration_20260430_science_board_block from './20260430_science_board_block';
import * as migration_20260430_science_board_fix_name from './20260430_science_board_fix_name';
import * as migration_20260501_091804 from './20260501_091804';
import * as migration_20260501_ab_variants_stat_break_outcomes from './20260501_ab_variants_stat_break_outcomes';
import * as migration_20260501_hero_banner_bg_image from './20260501_hero_banner_bg_image';
import * as migration_20260501_price_break_bg_color from './20260501_price_break_bg_color';
import * as migration_20260504_footer_link_color from './20260504_footer_link_color';
import * as migration_20260504_footer_theme_variants from './20260504_footer_theme_variants';
import * as migration_20260504_footer_variants_link_color from './20260504_footer_variants_link_color';
import * as migration_20260504_footer_variants_logo from './20260504_footer_variants_logo';
import * as migration_20260504_header_theme_variants from './20260504_header_theme_variants';
import * as migration_20260510_heading_richtext from './20260510_heading_richtext';
import * as migration_20260511_115656 from './20260511_115656';
import * as migration_20260526_floating_cta_localize_all from './20260526_floating_cta_localize_all';
import * as migration_20260526_hero_banner_price_localized from './20260526_hero_banner_price_localized';
import * as migration_20260610_081625_yp_hero_block from './20260610_081625_yp_hero_block';
import * as migration_20260610_085323_yp_plans_block from './20260610_085323_yp_plans_block';
import * as migration_20260610_091017_yp_plans_drop_defaults from './20260610_091017_yp_plans_drop_defaults';
import * as migration_20260610_093000_yp_plans_comparison_restructure from './20260610_093000_yp_plans_comparison_restructure';
import * as migration_20260610_094500_yp_plans_row_is_checkbox from './20260610_094500_yp_plans_row_is_checkbox';
import * as migration_20260610_100000_yp_plans_row_cell_type from './20260610_100000_yp_plans_row_cell_type';
import * as migration_20260610_110000_yp_three_components from './20260610_110000_yp_three_components';
import * as migration_20260610_113000_yp_components_chip_drop_rest from './20260610_113000_yp_components_chip_drop_rest';
import * as migration_20260610_130017_yp_dashboard from './20260610_130017_yp_dashboard';
import * as migration_20260610_131331_yp_dashboard_gauge_auto from './20260610_131331_yp_dashboard_gauge_auto';
import * as migration_20260610_133101_yp_dashboard_report_modal from './20260610_133101_yp_dashboard_report_modal';
import * as migration_20260610_133207_yp_dashboard_drop_report_url from './20260610_133207_yp_dashboard_drop_report_url';
import * as migration_20260610_134102_yp_timeline from './20260610_134102_yp_timeline';
import * as migration_20260610_135850_yp_science_board from './20260610_135850_yp_science_board';
import * as migration_20260611_084536_yp_science_drop_modal_title from './20260611_084536_yp_science_drop_modal_title';
import * as migration_20260611_085407_yp_science_modal_title from './20260611_085407_yp_science_modal_title';
import * as migration_20260611_085903_yp_science_drop_more from './20260611_085903_yp_science_drop_more';
import * as migration_20260611_091741_yp_athletes from './20260611_091741_yp_athletes';
import * as migration_20260611_093221_yp_breakup from './20260611_093221_yp_breakup';
import * as migration_20260611_093646_yp_faq from './20260611_093646_yp_faq';
import * as migration_20260611_094037_yp_reassurance from './20260611_094037_yp_reassurance';
import * as migration_20260611_094413_yp_buy_box from './20260611_094413_yp_buy_box';
import * as migration_20260611_132854_yp_sticky_buy from './20260611_132854_yp_sticky_buy';
import * as migration_20260609_ecommerce_blocks from './20260609_ecommerce_blocks'
import * as migration_20260611_homepage_blocks from './20260611_homepage_blocks'
import * as migration_20260611_the_case_hero from './20260611_the_case_hero'
import * as migration_20260612_090000_recreate_close_band from './20260612_090000_recreate_close_band'

export const migrations = [
  {
    up: migration_20260121_140435.up,
    down: migration_20260121_140435.down,
    name: '20260121_140435',
  },
  {
    up: migration_20260408_091809.up,
    down: migration_20260408_091809.down,
    name: '20260408_091809',
  },
  {
    up: migration_20260428_122159.up,
    down: migration_20260428_122159.down,
    name: '20260428_122159',
  },
  {
    up: migration_20260428_131604.up,
    down: migration_20260428_131604.down,
    name: '20260428_131604',
  },
  {
    up: migration_20260429_bio_groups_uuid.up,
    down: migration_20260429_bio_groups_uuid.down,
    name: '20260429_bio_groups_uuid',
  },
  {
    up: migration_20260429_biology_groups.up,
    down: migration_20260429_biology_groups.down,
    name: '20260429_biology_groups',
  },
  {
    up: migration_20260429_fix_bio_groups_v.up,
    down: migration_20260429_fix_bio_groups_v.down,
    name: '20260429_fix_bio_groups_v',
  },
  {
    up: migration_20260429_price_break_block.up,
    down: migration_20260429_price_break_block.down,
    name: '20260429_price_break_block',
  },
  {
    up: migration_20260429_variant_full_fields.up,
    down: migration_20260429_variant_full_fields.down,
    name: '20260429_variant_full_fields',
  },
  {
    up: migration_20260430_074534.up,
    down: migration_20260430_074534.down,
    name: '20260430_074534',
  },
  {
    up: migration_20260430_092252.up,
    down: migration_20260430_092252.down,
    name: '20260430_092252',
  },
  {
    up: migration_20260430_price_break_update.up,
    down: migration_20260430_price_break_update.down,
    name: '20260430_price_break_update',
  },
  {
    up: migration_20260430_science_board_block.up,
    down: migration_20260430_science_board_block.down,
    name: '20260430_science_board_block',
  },
  {
    up: migration_20260430_science_board_fix_name.up,
    down: migration_20260430_science_board_fix_name.down,
    name: '20260430_science_board_fix_name',
  },
  {
    up: migration_20260501_091804.up,
    down: migration_20260501_091804.down,
    name: '20260501_091804',
  },
  {
    up: migration_20260501_ab_variants_stat_break_outcomes.up,
    down: migration_20260501_ab_variants_stat_break_outcomes.down,
    name: '20260501_ab_variants_stat_break_outcomes',
  },
  {
    up: migration_20260501_hero_banner_bg_image.up,
    down: migration_20260501_hero_banner_bg_image.down,
    name: '20260501_hero_banner_bg_image',
  },
  {
    up: migration_20260501_price_break_bg_color.up,
    down: migration_20260501_price_break_bg_color.down,
    name: '20260501_price_break_bg_color',
  },
  {
    up: migration_20260504_footer_link_color.up,
    down: migration_20260504_footer_link_color.down,
    name: '20260504_footer_link_color',
  },
  {
    up: migration_20260504_footer_theme_variants.up,
    down: migration_20260504_footer_theme_variants.down,
    name: '20260504_footer_theme_variants',
  },
  {
    up: migration_20260504_footer_variants_link_color.up,
    down: migration_20260504_footer_variants_link_color.down,
    name: '20260504_footer_variants_link_color',
  },
  {
    up: migration_20260504_footer_variants_logo.up,
    down: migration_20260504_footer_variants_logo.down,
    name: '20260504_footer_variants_logo',
  },
  {
    up: migration_20260504_header_theme_variants.up,
    down: migration_20260504_header_theme_variants.down,
    name: '20260504_header_theme_variants',
  },
  {
    up: migration_20260510_heading_richtext.up,
    down: migration_20260510_heading_richtext.down,
    name: '20260510_heading_richtext',
  },
  {
    up: migration_20260511_115656.up,
    down: migration_20260511_115656.down,
    name: '20260511_115656',
  },
  {
    up: migration_20260526_floating_cta_localize_all.up,
    down: migration_20260526_floating_cta_localize_all.down,
    name: '20260526_floating_cta_localize_all',
  },
  {
    up: migration_20260526_hero_banner_price_localized.up,
    down: migration_20260526_hero_banner_price_localized.down,
    name: '20260526_hero_banner_price_localized',
  },
  {
    up: migration_20260610_081625_yp_hero_block.up,
    down: migration_20260610_081625_yp_hero_block.down,
    name: '20260610_081625_yp_hero_block',
  },
  {
    up: migration_20260610_085323_yp_plans_block.up,
    down: migration_20260610_085323_yp_plans_block.down,
    name: '20260610_085323_yp_plans_block',
  },
  {
    up: migration_20260610_091017_yp_plans_drop_defaults.up,
    down: migration_20260610_091017_yp_plans_drop_defaults.down,
    name: '20260610_091017_yp_plans_drop_defaults',
  },
  {
    up: migration_20260610_093000_yp_plans_comparison_restructure.up,
    down: migration_20260610_093000_yp_plans_comparison_restructure.down,
    name: '20260610_093000_yp_plans_comparison_restructure',
  },
  {
    up: migration_20260610_094500_yp_plans_row_is_checkbox.up,
    down: migration_20260610_094500_yp_plans_row_is_checkbox.down,
    name: '20260610_094500_yp_plans_row_is_checkbox',
  },
  {
    up: migration_20260610_100000_yp_plans_row_cell_type.up,
    down: migration_20260610_100000_yp_plans_row_cell_type.down,
    name: '20260610_100000_yp_plans_row_cell_type',
  },
  {
    up: migration_20260610_110000_yp_three_components.up,
    down: migration_20260610_110000_yp_three_components.down,
    name: '20260610_110000_yp_three_components',
  },
  {
    up: migration_20260610_113000_yp_components_chip_drop_rest.up,
    down: migration_20260610_113000_yp_components_chip_drop_rest.down,
    name: '20260610_113000_yp_components_chip_drop_rest',
  },
  {
    up: migration_20260610_130017_yp_dashboard.up,
    down: migration_20260610_130017_yp_dashboard.down,
    name: '20260610_130017_yp_dashboard',
  },
  {
    up: migration_20260610_131331_yp_dashboard_gauge_auto.up,
    down: migration_20260610_131331_yp_dashboard_gauge_auto.down,
    name: '20260610_131331_yp_dashboard_gauge_auto',
  },
  {
    up: migration_20260610_133101_yp_dashboard_report_modal.up,
    down: migration_20260610_133101_yp_dashboard_report_modal.down,
    name: '20260610_133101_yp_dashboard_report_modal',
  },
  {
    up: migration_20260610_133207_yp_dashboard_drop_report_url.up,
    down: migration_20260610_133207_yp_dashboard_drop_report_url.down,
    name: '20260610_133207_yp_dashboard_drop_report_url',
  },
  {
    up: migration_20260610_134102_yp_timeline.up,
    down: migration_20260610_134102_yp_timeline.down,
    name: '20260610_134102_yp_timeline',
  },
  {
    up: migration_20260610_135850_yp_science_board.up,
    down: migration_20260610_135850_yp_science_board.down,
    name: '20260610_135850_yp_science_board',
  },
  {
    up: migration_20260611_084536_yp_science_drop_modal_title.up,
    down: migration_20260611_084536_yp_science_drop_modal_title.down,
    name: '20260611_084536_yp_science_drop_modal_title',
  },
  {
    up: migration_20260611_085407_yp_science_modal_title.up,
    down: migration_20260611_085407_yp_science_modal_title.down,
    name: '20260611_085407_yp_science_modal_title',
  },
  {
    up: migration_20260611_085903_yp_science_drop_more.up,
    down: migration_20260611_085903_yp_science_drop_more.down,
    name: '20260611_085903_yp_science_drop_more',
  },
  {
    up: migration_20260611_091741_yp_athletes.up,
    down: migration_20260611_091741_yp_athletes.down,
    name: '20260611_091741_yp_athletes',
  },
  {
    up: migration_20260611_093221_yp_breakup.up,
    down: migration_20260611_093221_yp_breakup.down,
    name: '20260611_093221_yp_breakup',
  },
  {
    up: migration_20260611_093646_yp_faq.up,
    down: migration_20260611_093646_yp_faq.down,
    name: '20260611_093646_yp_faq',
  },
  {
    up: migration_20260611_094037_yp_reassurance.up,
    down: migration_20260611_094037_yp_reassurance.down,
    name: '20260611_094037_yp_reassurance',
  },
  {
    up: migration_20260611_094413_yp_buy_box.up,
    down: migration_20260611_094413_yp_buy_box.down,
    name: '20260611_094413_yp_buy_box',
  },
  {
    up: migration_20260611_132854_yp_sticky_buy.up,
    down: migration_20260611_132854_yp_sticky_buy.down,
    name: '20260611_132854_yp_sticky_buy',
  },
  {
    up: migration_20260609_ecommerce_blocks.up,
    down: migration_20260609_ecommerce_blocks.down,
    name: '20260609_ecommerce_blocks',
  },
  {
    up: migration_20260611_homepage_blocks.up,
    down: migration_20260611_homepage_blocks.down,
    name: '20260611_homepage_blocks',
  },
  {
    up: migration_20260611_the_case_hero.up,
    down: migration_20260611_the_case_hero.down,
    name: '20260611_the_case_hero',
  },
  {
    up: migration_20260612_090000_recreate_close_band.up,
    down: migration_20260612_090000_recreate_close_band.down,
    name: '20260612_090000_recreate_close_band',
  },
]
