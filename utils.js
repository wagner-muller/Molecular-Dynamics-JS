/**
This module provides functions to perform vector and property operations
commonly used in simulation programs.
*/

export const VAdd = (v1, v2, v3) => {
    v1.x = v2.x + v3.x
    v1.y = v2.y + v3.y
    v1.z = v2.z + v3.z
}

export const VSub = (v1, v2, v3) => {
    v1.x = v2.x - v3.x
    v1.y = v2.y - v3.y
    v1.z = v2.z - v3.z
}                                

export const VDot = (v1, v2) => {
    return (v1.x * v2.x + v1.y * v2.y  + v1.z * v2.z)
}

export const VSAdd = (v1, v2, s3, v3) => {
    v1.x = v2.x + s3 * v3.x
    v1.y = v2.y + s3 * v3.y
    v1.z = v2.z + s3 * v3.z
}

export const VSet = (v, sx, sy, sz) => {
    v.x = sx
    v.y = sy
    v.z = sz
}

export const VSetAll = (v, s) => {
    return VSet(v,s,s,s)
}

export const VZero = (v) => {
    return VSetAll(v,0)
}

export const VVSAdd = (v1, s2, v2) => {
    return VSAdd(v1, v1, s2, v2) 
}

export const VLenSq = (v) => {
    return VDot(v, v)
}

export const VWrapAll = (v, region) => {
    if (v.x >= 0.5 * region.x) {
        v.x -= region.x;
    } else if (v.x < -0.5 * region.x){
        v.x += region.x;
    }
    if (v.y >= 0.5 * region.y) {
        v.y -= region.y;
    } else if (v.y < -0.5 * region.y){
        v.y += region.y;
    }
    if (v.z >= 0.5 * region.z) {
        v.z -= region.z;
    } else if (v.z < -0.5 * region.z){
        v.z += region.z;
    }
}

export const VMul = (v1, v2, v3) =>{
    v1.x = v2.x * v3.x
    v1.y = v2.y * v3.y
    v1.z = v2.z * v3.z
}

export const VDiv = (v1, v2, v3) => {
    v1.x = v2.x / v3.x
    v1.y = v2.y / v3.y
    v1.z = v2.z / v3.z
}

export const VScale = (v, s) => {
    v.x *= s
    v.y *= s
    v.z *= s
} 

export const VVAdd = (v1, v2) => {
    return VAdd(v1, v1, v2)
}

export const VSCopy = (v2, s1, v1) => {
    v2.x = s1 * v1.x 
    v2.y = s1 * v1.y
    v2.z = s1 * v1.z
}

export const VSInt = (v) => {
    v.x = parseInt(v.x)
    v.y = parseInt(v.y)
    v.z = parseInt(v.z)
}

export const VProd = (v) =>{
    return (v.x * v.y * v.z)
}

export const PropZero = (v) => {
    v.sum = 0.
    v.sum2 = 0.
}
export const PropAccum = (v) => {
    v.sum += v.val
    v.sum2 += v.val*v.val
}

export const PropAvg = (v, n) => {
    v.sum /= n
    v.sum2 = Math.sqrt(Math.max(v.sum2 / n - v.sum*v.sum, 0))
}

export const VRand = (v) => {
    let s = 2. 
    let x = 0.
    let y = 0.;
    while(s > 1){
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
        s = x * x + y * y;
    }
    v.z = 1 - 2 * s
    s = 2 * Math.sqrt(1-s)
    v.x = s * x;
    v.y = s * y;
}

export const VCSum = (v) => {
    return (v.x + v.y + v.z)
}

export const VLen = (v) =>{
    return(Math.sqrt(VDot(v, v)))
}

export const VLinear = (p, s) => {
    return ((p.z * s.y + p.y) * s.x + p.x)
}

export const VCellWrapAll = (m2v, shift) => {
    if (m2v.x >= cells.x) { 
        m2v.x = 0;
        shift.x = region.x; 
    }else if( m2v.x < 0){
        m2v.x = cells.x - 1; 
        shift.x = - region.x; 
    }

    if (m2v.y >= cells.y) { 
        m2v.y = 0;
        shift.y = region.y; 
    }else if( m2v.y < 0){
        m2v.y = cells.y - 1; 
        shift.y = - region.y; 
    }

    if (m2v.z >= cells.z) { 
        m2v.z = 0;
        shift.z = region.z; 
    }else if( m2v.z < 0){
        m2v.z = cells.z - 1; 
        shift.z = - region.z; 
    }
}

export const VVSub  = (v1, v2) =>{
    VSub (v1, v1, v2)
} 

export const PCR4 = (r, ro, v, a, a1 , a2, wr, cr) => {
    r.x = ro.x + deltaT * v.x + wr * (cr[0] * a.x + cr[1] * a1.x + cr[2] * a2.x)
    r.y = ro.y + deltaT * v.y + wr * (cr[0] * a.y + cr[1] * a1.y + cr[2] * a2.y)
    r.z = ro.z + deltaT * v.z + wr * (cr[0] * a.z + cr[1] * a1.z + cr[2] * a2.z)
}

export const PCV4 = (r, ro, v, a, a1, a2, wv, cv) =>{
    v.x = (r.x - ro.x) / deltaT + wv * (cv[0] * a.x + cv[1] * a1.x + cv[2] * a2.x)
    v.y = (r.y - ro.y) / deltaT + wv * (cv[0] * a.y + cv[1] * a1.y + cv[2] * a2.y)
    v.z = (r.z - ro.z) / deltaT + wv * (cv[0] * a.z + cv[1] * a1.z + cv[2] * a2.z)
}