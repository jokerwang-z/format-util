### 示例

* 格式化保留指定小数位数。
* 可用来格式化金额，手机号，银行卡等

```
formatDecimal(1.555, 2, 'round') // 1.56
formatDecimal(1.554, 2, 'round') // 1.55

formatDecimal(1.554, 2, 'ceil') // 1.56
formatDecimal(1.551, 2, 'ceil') // 1.56

formatDecimal(1.556, 2, 'floor') // 1.55
formatDecimal(1.553, 2, 'floor') // 1.55


formatNumber(18300000000, {type: ' ', splitLength: 4}) // 183 0000 0000
formatNumber(100000000.1, {type: ',', splitLength: 3}) // 100,000,000.1
formatNumber('6222600260001072444', {type: ' ', splitLength: 4, leftToRight: true}) // 6222 6002 6000 1072 444

```