define(function() {
   var field = {
        fieldRatio : 68 / 105,
        fieldW : 600,
        fieldH : null,
        fieldColor : 'green',
        goalW: 10,
        worldRatio: 50
    };
    
    field.fieldH =  field.fieldW * field.fieldRatio;
    field.ratioPixel = field.fieldW / 105;
    field.screenW = field.fieldW + 2 * field.goalW;
    field.screenH = field.fieldH;
   
   return field;
})