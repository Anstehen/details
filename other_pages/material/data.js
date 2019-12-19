module.exports = {
  data:[
    [
      {
        id:1,
        type: 'image',
        field:'image1'
      },
      {
        id:1,
        type: 'image',
        field: 'image2'

      },
      {
        id:1,
        type: 'image',
        field: 'image3'

      },
      {
        id:1,
        type: 'image',
        field: 'image4'

      },
    ],
    [
      {
        id:1,
        type:'radio',
        question:'性别',
        field: 'sex',
        options:[
          {
            id: 0,
            type: 1,
            text: '男',
          },
          {
            id: 0,
            type: 1,
            text: '女',
          },
        ]
      },
      {
        id: 1,
        type: 'select',
        field: 'height',
        unit:'cm',
        question: '身高',
        options:'100-220',
      },
      {
        id: 1,
        type: 'select',
        field: 'age',
        unit:'岁',
        question: '年龄',
        options: '0-99',
      },
      {
        id: 1,
        type: 'select',
        field: 'weight',
        unit:'kg',
        question: '体重',
        options: '100-220',
      },
      {
        id: 1,
        type: 'input',
        field: 'profession',
        question: '体重',
        maxlength:10,
      }
    ],
    [
      {
        id: 1,
        type: 'address',
        field: 'address',
        question: '所在地址',
        
      },
      {
        id: 1,
        type: 'input',
        field: 'sex',
        question: '详细地址',

      },
    ],
    [
      {
      id: 1,
      type: 'radio',
      question: '请选择改变发型的程度',
      field: 'sex',
      options: [
        {
          id: 0,
          type: 1,
          text: '尽可能少改变',
        },
        {
          id: 1,
          type: 1,
          text: '接受适当的改变',
        },
        {
          id: 2,
          type: 1,
          text: '只要适合我，非常接受改变',
        },
      ]
      

      }
    ],
    [
      {
        id: 1,
        type: 'radio',
        question: '请选择对长度的要求',
        field: 'sex',
        options: [
          {
            id: 0,
            type: 1,
            text: '好看就行',
          },
          {
            id: 1,
            type: 1,
            text: '保留长度',
          },
          {
            id: 2,
            type: 1,
            text: '希望剪短',
          },
        ]


      }
    ],
    [
      {
        id: 1,
        type: 'radio',
        question: '请选择对烫染的要求',
        field: 'sex',
        options: [
          {
            id: 0,
            type: 1,
            text: '不想染发',
          },
          {
            id: 1,
            type: 1,
            text: '不想烫发',
          },
          {
            id: 2,
            type: 1,
            text: '烫染都不要',
          },
          {
            id: 3,
            type: 1,
            text: '只要好看都能接受',
          },
        ]


      }
    ],
    [
      {
        id: 1,
        type: 'check',
        question: '请选择着装风格',
        field: 'sex',
        options: [
          //潮男 型男  新男 绅士  文艺 轻奢

          {
            id: 0,
            type: 1,
            text: '潮男',
          },
          {
            id: 1,
            type: 1,
            text: '型男',
          },
          {
            id: 2,
            type: 1,
            text: '新男',
          },
          {
            id: 3,
            type: 1,
            text: '绅士',
          },
          {
            id: 4,
            type: 1,
            text: '文艺',
          },
          {
            id: 5,
            type: 1,
            text: '轻奢',
          },
        ]


      }
    ],
    [
      {
        id: 1,
        type: 'check',
        question: '请选择着装风格',
        field: 'sex',
        options: [
          //潮男 型男  新男 绅士  文艺 轻奢

          {
            id: 0,
            type: 1,
            text: '潮男',
          },
          {
            id: 1,
            type: 1,
            text: '型男',
          },
          {
            id: 2,
            type: 1,
            text: '新男',
          },
          {
            id: 3,
            type: 1,
            text: '绅士',
          },
          {
            id: 4,
            type: 1,
            text: '文艺',
          },
          {
            id: 5,
            type: 1,
            text: '轻奢',
          },
        ]


      }
    ],
    [
      {
        id: 1,
        type: 'check',
        question: '请选择着装风格',
        field: 'sex',
        options: [
          {
            id: 0,
            type: 1,
            text: '休闲',
          },
          {
            id: 1,
            type: 1,
            text: '中性',
          },
          {
            id: 2,
            type: 1,
            text: '文艺',
          },
          {
            id: 3,
            type: 1,
            text: '甜美',
          },
          {
            id: 4,
            type: 1,
            text: '淑女',
          },
          {
            id: 5,
            type: 1,
            text: '运动',
          },
        ]
      }
    ],
    [
      {
        id: 1,
        type: 'radio',
        question: '请选择打理习惯',
        field: 'sex',
        options: [
          {
            id: 0,
            type: 1,
            text: '不打理',
          },
          {
            id: 1,
            type: 1,
            text: '偶尔打理',
          },
          {
            id: 2,
            type: 1,
            text: '经常打理',
          },

        ]
      }
    ],
  ],
}