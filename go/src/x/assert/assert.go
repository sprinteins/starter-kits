package assert

import (
	"fmt"
	"path/filepath"
	"reflect"
	"runtime"
	"testing"
)

// Assert fails the test if the condition is false.
func Assert(tb testing.TB, condition bool, failMsg string, v ...interface{}) {
	if !condition {
		_, file, line, _ := runtime.Caller(1)
		fmt.Printf("\033[31m%s:%d: "+failMsg+"\033[39m\n\n", append([]interface{}{filepath.Base(file), line}, v...)...)
		tb.FailNow()
	}
}

// Ok fails the test if an err is not nil.
func Ok(tb testing.TB, err error) {
	if err != nil {
		_, file, line, _ := runtime.Caller(1)
		fmt.Printf("\033[31m%s:%d: unexpected error: %s\033[39m\n\n", filepath.Base(file), line, err.Error())
		tb.FailNow()
	}
}

// Equals fails the test if exp is not equal to act.
func Equals(tb testing.TB, act, exp interface{}, failMsg string) {
	if !reflect.DeepEqual(exp, act) {
		_, file, line, _ := runtime.Caller(1)
		fmt.Printf("\033[31m"+failMsg+"\n\033[31m%s:%d:\n\n\texp: %#v\n\n\tgot: %#v\033[39m\n\n", filepath.Base(file), line, exp, act)
		tb.FailNow()
	}
}

// Same fails the test if the two objects are not the same
func Same(tb testing.TB, act, exp interface{}, failMsg string) {
	if act != exp {
		_, file, line, _ := runtime.Caller(1)
		fmt.Printf("\033[31m"+failMsg+"\n\033[31m%s:%d:\n\n\texp: %p -> %#v\n\n\tgot: %p -> %#v\033[39m\n\n", filepath.Base(file), line, exp, exp, act, act)
		tb.FailNow()
	}
}

// NotNil asserts if the act is nill
func NotNil(tb testing.TB, act interface{}, failMsg string) {
	Assert(tb, act != nil, failMsg)
}
