enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * 超声波测距
 */
//% color="#2c3e50" weight=10 block="器件扩展"
namespace microbit_extend{
    /**
     * 在trig脚发送约10ms的高电平，等待在echo脚出现高电平时开始计时，返回时间或距离。
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="超声波测距:|ping trig %trig|echo %echo|unit %unit"
    export function sonar_ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // 发送脉冲
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
	control.waitMicros(2);		//2ms
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // echo脚高电平持续时间,时间单位为us
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }
}
