var MyActivityForm = {
    activity: null,
    site: null,
    tech: null,
    band: null,
    set_info: function(activity, site, tech, band){
        this.activity = activity;
        this.site = site;
        this.tech = tech;
        this.band = band;
    },
    concat_unique_multiple_values: function(dataArray){
        //remove duplicate
        uniqDataArray = dataArray.filter((value,index,arr)=>arr.indexOf(value)===index);
        //remove empty
        uniqDataArray = uniqDataArray.filter(value => value);
        return uniqDataArray.join(';');
    },
    fill_to_form_fields: function(dataSrcObjArray, inputFieldMap, activityDataSrc){
        //let input_field_map = {'device_name': 'device_id', 'vendor': 'vendor_id', 'homing': 'parent_device_id', 'equipment_type': 'model'};
        fieldMap = (this.tech in inputFieldMap)? inputFieldMap[this.tech] : inputFieldMap;
        data = activityDataSrc.indexOf(this.activity) > -1? dataSrcObjArray['nms']: dataSrcObjArray['aid'];

        if(data.length == 1){
            Object.keys(fieldMap).map(field => $(`#id_${field}`).val(data[0][fieldMap[field]]));
        }else if(data.length > 1){
            Object.keys(fieldMap).map(field => $(`#id_${field}`)
                .val(this.concat_unique_multiple_values(data.map(row => row[fieldMap[field]]))));
        }else{
            Object.keys(fieldMap).map(field => $(`#id_${field}`).val(''));
        }
        Object.keys(fieldMap).map(field => $(`#${field}_field_container :input`).prop('required', true));
        Object.keys(fieldMap).map(field => $(`#${field}_field_container`).show());
    },
    fill_trx_config_field: function(dataSrcObjArray, activityDataSrc){
        trxData = activityDataSrc.indexOf(this.activity) > -1? dataSrcObjArray['nms']: dataSrcObjArray['aid'];

        trxParentDictCount = {};
        trxParentDict = Object.values(trxData).map(item => item.parent_id);
        for(i in trxParentDict){
            if(trxParentDict[i] in trxParentDictCount){
                trxParentDictCount[trxParentDict[i]] += 1;
            }else{
                trxParentDictCount[trxParentDict[i]] = 1;
            }
        }

        trxConfig = Object.values(trxParentDictCount).map(trxCount => trxCount).join('+');
        $('#id_trx_config').val(trxConfig);
    },
    fill_general_info_fields: function(){
        if(this.activity == 'Rollout'){
            $("#id_site_status option").filter(function() {
                //may want to use $.trim in here
                return $(this).text() == 'Unlocked';
            }).prop('selected', true);
        }
        
        if(this.activity == 'On-Air'){
            $("#id_site_status option").filter(function() {
                //may want to use $.trim in here
                return $(this).text() == 'On-air';
            }).prop('selected', true);
        }
        $("#id_site_status").prop('required', true);

        $('#id_user option').filter(function(){
            return $(this).text() == Cookies.get('aid-user');
        }).prop('selected', true);
        $("#id_user").prop('required', true);

        $('.general-input-container').show();
    }
}